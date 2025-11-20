package com.example.demo.domain.service;

import com.example.demo.domain.dto.NoticesDto;
import com.example.demo.domain.entity.NoticesEntity;
import com.example.demo.domain.repository.NoticesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticesService {

    // 💡 NoticesFileService: 선생님께서 사용하신 파일 서비스 이름 유지
    private final NoticesRepository noticesRepository;
    private final NoticesFileService noticesFileService;

    //---------------------------------------------------------
    // 1. 공지사항 목록조회
    //---------------------------------------------------------
    @Transactional(readOnly = true)
    public List<NoticesDto> findAllNotices(){
        return noticesRepository.findAll().stream()
                // 💡 NoticesEntity의 toDto() 메서드 사용
                .map(NoticesEntity::toDto)
                .collect(Collectors.toList());
    }

    //---------------------------------------------------------
    // 2. 상세 조회 및 조회수 증가
    //---------------------------------------------------------
    @Transactional
    public NoticesDto findNoticesDetail(Long id){
        // 조회수 증가 쿼리 호출 (DB에서 1증가 처리)
        noticesRepository.updateViews(id);

        NoticesEntity entity = noticesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notices not found with id : " + id));

        // 💡 NoticesEntity의 toDto() 메서드 사용
        return entity.toDto();
    }

    //---------------------------------------------------------
    // 3. 작성(Create) - 파일 업로드 포함 (가장 최신 버전)
    //---------------------------------------------------------

    /**
     * 공지사항 등록 (파일 업로드 포함)
     * @param dto 공지사항 텍스트 데이터 (title, content 등)
     * @param files 클라이언트에서 받은 파일 목록
     * @return 저장된 NoticesDto
     */
    @Transactional
    public NoticesDto saveNotices(NoticesDto dto, List<MultipartFile> files) throws IOException {

        // 1. 작성자 자동 삽입 로직 (기존 saveNotices(dto)에서 통합)
        String currentAdminUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        dto.setAuthor(currentAdminUsername);

        // 2. DTO를 NoticesEntity로 변환 후 DB에 저장 (ID 생성)
        NoticesEntity noticesEntity = noticesRepository.save(NoticesEntity.fromDto(dto));

        // 3. 파일 목록이 있다면 NoticesFileService를 통해 파일 저장
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                // FileService 호출: 실제 파일 저장 및 NoticesFile DB 정보 저장
                noticesFileService.saveFile(file, noticesEntity);
            }
        }

        // 4. 저장된 Entity를 DTO로 변환하여 반환
        // 💡 NoticesEntity의 toDto() 메서드 사용
        return noticesEntity.toDto();
    }


    //---------------------------------------------------------
    // 4. 수정(Update) - 파일 업로드 포함
    //---------------------------------------------------------

    /**
     * 공지사항 수정 (새 파일 추가 포함)
     * @param id 수정할 공지사항 ID
     * @param dto 수정 데이터
     * @param newFiles 새로 추가할 파일 목록
     * @return 수정된 NoticesDto
     */
    @Transactional
    public NoticesDto updateNotices(Long id, NoticesDto dto, List<MultipartFile> newFiles) throws IOException {
        NoticesEntity trueEntity = noticesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notices not found with id : " + id));

        // 1. 공지사항 내용 업데이트 (Dirty Checking)
        trueEntity.updateFromDto(dto); // title(제목), contents(내용) 변경

        // 2. 새 파일 추가 처리
        if (newFiles != null && !newFiles.isEmpty()) {
            for (MultipartFile file : newFiles) {
                // FileService 호출: 새 파일을 기존 엔티티에 연결
                noticesFileService.saveFile(file, trueEntity);
            }
        }

        // 3. 수정된 Entity를 DTO로 변환하여 반환
        // 💡 NoticesEntity의 toDto() 메서드 사용
        return trueEntity.toDto();
    }


    //---------------------------------------------------------
    // 5. 삭제(Delete)
    //---------------------------------------------------------
    @Transactional
    public void deleteNotices(Long id){
        noticesRepository.deleteById(id);
    }
}