package com.example.demo.restController;

import com.example.demo.domain.dto.NoticesDto;
import com.example.demo.domain.entity.NoticesFile;
import com.example.demo.domain.service.NoticesFileService;
import com.example.demo.domain.service.NoticesService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;

//REACT 분리 VER.
@Slf4j
@RestController
@RequestMapping("/api/notices") //-> JSON 반환 -> React에서 화면 렌더링
@RequiredArgsConstructor
@Tag(name="NoticesController", description="This is NoticesController")

public class NoticesRestController {

    private final NoticesService noticesService;
    private final NoticesFileService noticesFileService;

    //1. 공지사항 목록 조회: GET /api/notices
    @GetMapping
    public ResponseEntity<List<NoticesDto>> getAllNotices(){
        List<NoticesDto> notices = noticesService.findAllNotices();
        return ResponseEntity.ok(notices);
    }

    //2. 상세 조회 및 조회수 증가 READ + UPDATE : GET /api/notices/{id}
    @GetMapping("/{id}")
    public ResponseEntity<NoticesDto> getNoticesByIdApi(@PathVariable Long id){
        NoticesDto notice = noticesService.findNoticesDetail(id);
        return ResponseEntity.ok(notice); //JSON 데이터 반환
    }

    //3. 작성 : POST /api/notices - 파일 업로드 포함
    @SecurityRequirement(name = "BearerAuth")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NoticesDto> saveNoticesApi(
            // @ModelAttribute는 복합 데이터(DTO + 파일) 수신에 적합
            @ModelAttribute NoticesDto dto,
            @RequestParam(value = "files", required = false) List<MultipartFile> files
    ) {
        try {
            // Service 호출 시 DTO와 파일 리스트 함께 전달
            NoticesDto savedDto = noticesService.saveNotices(dto, files);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDto);
        } catch (IOException e) {
            log.error("공지사항 및 파일 생성 중 I/O 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            log.error("공지사항 생성 중 예상치 못한 오류 발생", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //4. 수정 : PUT /api/notices/{id} - 파일 업로드 포함
    @SecurityRequirement(name = "BearerAuth")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NoticesDto> updateNoticesApi(
            @PathVariable Long id,
            @ModelAttribute NoticesDto dto,
            @RequestParam(value = "newFiles", required = false) List<MultipartFile> newFiles
    ) {
        try {
            // Service 호출 시 ID, DTO, 새 파일 리스트 함께 전달
            NoticesDto updatedDto = noticesService.updateNotices(id, dto, newFiles);
            return ResponseEntity.ok(updatedDto);
        } catch (IOException e) {
            log.error("공지사항 및 파일 수정 중 I/O 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (IllegalArgumentException e) {
            log.warn("Notices not found for update: id={}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //---------------------------------------------------------
    // 6. 파일 다운로드 API (새로 추가)
    //---------------------------------------------------------
    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFileApi(@PathVariable Long fileId) {

        try {
            // 1. 파일 ID로 DB에서 파일 메타 정보(경로, 이름) 조회
            NoticesFile fileInfo = noticesFileService.downloadFile(fileId);

            // 2. 파일 경로를 기반으로 실제 파일 리소스를 로드
            Resource resource = noticesFileService.getFileResource(fileInfo.getFilePath());

            // 3. 파일 이름 인코딩 (한글 파일명 깨짐 방지 - RFC 5987/6266 표준 적용)
            String originalFileName = fileInfo.getOriginalFileName();

            // StandardCharsets.UTF_8.name() 대신 toString()도 무방하지만 name()이 더 명확
            // +를 %20으로 치환하는 것은 필수 (URL 인코딩과 HTTP 헤더 인코딩의 차이 때문)
            String encodedFileName = URLEncoder.encode(originalFileName, StandardCharsets.UTF_8.name())
                    .replaceAll("\\+", "%20");

            // 4. HTTP 헤더 설정 (다운로드 형식 지정)
            HttpHeaders headers = new HttpHeaders();

            // Content-Disposition 설정 (이중 인코딩 방지)
            String asciiSafeName = originalFileName.replaceAll("[^a-zA-Z0-9._-]", "_");
            String contentDisposition = String.format(
                    "attachment; filename=\"%s\"; filename*=UTF-8''%s",
                    asciiSafeName,  // fallback용 ASCII 파일명
                    encodedFileName  // UTF-8 인코딩된 실제 파일명
            );

            headers.add(HttpHeaders.CONTENT_DISPOSITION, contentDisposition);

            // 파일명으로 추론하는 방식 대신, DB에 저장된 NoticesFile의 MIME Type 사용
            headers.setContentType(MediaType.parseMediaType(fileInfo.getMimeType()));


            log.info("Downloading file: {}, Content-Type: {}", originalFileName, fileInfo.getMimeType());

            // 5. ResponseEntity 반환 (Resource와 헤더 전달)
            return ResponseEntity.ok()
                    // Content-Length 헤더는 다운로드 진행 상황을 위해 반드시 명시하는 것이 좋습니다.
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(resource.contentLength()))
                    .headers(headers)
                    .body(resource);

        } catch (IllegalArgumentException e) {
            log.warn("File metadata not found: fileId={}", fileId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IOException e) {
            // resource.contentLength() 호출 시 IO 예외 발생 가능
            log.error("Resource I/O error during file download: fileId={}", fileId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            log.error("Error occurred during file download: fileId={}", fileId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    //5. 삭제 : DELETE /api/notices/{id}
    @SecurityRequirement(name = "BearerAuth")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteNoticesApi(@PathVariable Long id){
        noticesService.deleteNotices(id);
        return ResponseEntity.noContent().build(); //204 No Content return
    }


}


