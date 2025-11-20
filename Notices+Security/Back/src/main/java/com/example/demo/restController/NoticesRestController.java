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
            NoticesFile fileInfo = noticesFileService.getFileMetadata(fileId);

            // 2. 파일 경로를 기반으로 실제 파일 리소스를 로드
            Resource resource = noticesFileService.getFileResource(fileInfo.getFilePath());

            // 3. 파일 이름 인코딩 (한글 파일명 깨짐 방지)
            String originalFileName = fileInfo.getOriginalFileName();
            String encodedFileName = URLEncoder.encode(originalFileName, StandardCharsets.UTF_8.toString()).replaceAll("\\+", "%20");

            // 4. HTTP 헤더 설정 (다운로드 형식 지정)
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFileName + "\"");
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            // 5. ResponseEntity 반환 (Resource와 헤더 전달)
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);

        } catch (IllegalArgumentException e) {
            log.warn("File not found: fileId={}", fileId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("파일 다운로드 중 오류 발생: fileId={}", fileId, e);
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

// -------------------------------------------------
// 💻 SB 통합 VER (Thymeleaf/JSP View 렌더링) - 현재 주석 처리됨
// -------------------------------------------------

/*
@Controller // @RestController 대신 @Controller 사용
@RequestMapping("/notices") // API가 아닌 일반 URL 경로
@RequiredArgsConstructor
public class NoticesIntegratedController {

    // SB 통합 버전을 활성화할 때, 이 클래스가 Controller 역할을 하며 NoticesService를 주입받음
    private final NoticesService noticesService;

    // 1. 목록 조회 (GET /notices)
    @GetMapping
    public String getAllNoticesIntegrated(
        Model model,
        @RequestParam(value = "error", required = false) String error) {

        // 에러 메시지 처리 로직 (SecurityConfig에서 리다이렉트 시 보낸 쿼리 파라미터 처리)
        if ("unauthorized".equals(error)) {
            model.addAttribute("errorMessage", "로그인이 필요합니다. 해당 기능은 인증된 사용자만 접근할 수 있습니다.");
        } else if ("forbidden".equals(error)) {
            model.addAttribute("errorMessage", "접근 권한이 없습니다. 해당 기능은 관리자(ADMIN)만 사용할 수 있습니다.");
        }

        model.addAttribute("notices", noticesService.findAllNotices());
        return "notices/list"; // HTML 파일명 반환
    }

    // 2. 상세 조회 (GET /notices/{id})
    @GetMapping("/{id}")
    public String getNoticesByIdIntegrated(@PathVariable Long id, Model model) {
        NoticesDto notice = noticesService.findNoticesDetail(id);
        model.addAttribute("notice", notice);
        return "notices/detail";
    }

    // 3. 작성 처리 (POST /notices)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createNoticesIntegrated(@ModelAttribute NoticesDto dto) {
        noticesService.saveNotices(dto);
        return "redirect:/notices";
    }

    // 4. 수정 처리 (PUT 대신 POST 사용)
    @PostMapping("/{id}/update")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateNoticesIntegrated(@PathVariable Long id, @ModelAttribute NoticesDto dto) {
        noticesService.updateNotices(id, dto);
        return "redirect:/notices/" + id;
    }

    // 5. 삭제 처리 (POST /notices/{id}/delete)
    @PostMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteNoticesIntegrated(@PathVariable Long id) {
        noticesService.deleteNotices(id);
        return "redirect:/notices";
    }
}
*/
}


