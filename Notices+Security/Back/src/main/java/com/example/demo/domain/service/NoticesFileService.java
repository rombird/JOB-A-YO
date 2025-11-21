package com.example.demo.domain.service;

import com.example.demo.domain.entity.NoticesEntity;
import com.example.demo.domain.entity.NoticesFile;
import com.example.demo.domain.repository.NoticesFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticesFileService {

    // Repository 인터페이스를 인스턴스 변수로 주입받습니다.
    private final NoticesFileRepository noticesFileRepository;

    // application.properties에 설정된 파일 저장 경로 주입
    @Value("${file.upload.dir}")
    private String uploadDir;

    //---------------------------------------------------------
    // 1. 파일 저장 로직 (업로드)
    //---------------------------------------------------------

    /**
     * 실제 파일 시스템에 파일을 저장하고, DB에 파일 메타 정보를 저장합니다.
     * @param file 클라이언트가 업로드한 파일
     * @param notices 파일이 연결될 NoticesEntity
     * @return 저장된 NoticesFile Entity
     */
    @Transactional
    public NoticesFile saveFile(MultipartFile file, NoticesEntity notices) throws IOException {
        if (file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        // UUID를 사용해 고유한 저장 파일명 생성
        String storedFileName = UUID.randomUUID().toString() + "_" + originalFileName;
        String savePath = uploadDir + storedFileName;

        // 저장 디렉토리가 없으면 생성
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 실제 파일 저장
        File targetFile = new File(savePath);
        file.transferTo(targetFile);

        // DB에 저장할 NoticesFile Entity 생성
        NoticesFile fileEntity = new NoticesFile();
        fileEntity.setOriginalFileName(originalFileName);
        fileEntity.setStoredFileName(storedFileName);
        fileEntity.setFilePath(savePath);
        fileEntity.setFileSize(file.getSize());
        fileEntity.setNotices(notices); // 공지사항 엔티티와 연결

        return noticesFileRepository.save(fileEntity);
    }

    //---------------------------------------------------------
    // 2. 파일 다운로드 로직 (통합 메서드)
    //---------------------------------------------------------

    /*
     * 파일 ID로 DB 정보를 조회하고, 실제 파일을 Resource로 로드하여 반환
     * @param fileId 다운로드할 파일의 고유 ID
     * @return 파일 엔티티
     */
    @Transactional(readOnly = true) // 읽기 전용으로 설정하여 성능 최적화
    public NoticesFile downloadFile(Long fileId) {
        // 1. DB에서 파일 정보(NoticesFile 엔티티)를 조회
        NoticesFile fileEntity = noticesFileRepository.findById(fileId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found with id: " + fileId));

        // 2. 파일 경로를 기반으로 Resource 로드 및 검증 (실제 다운로드 전에 파일 유무 확인)
        Resource resource = getFileResource(fileEntity.getFilePath());

        if (!resource.exists() || !resource.isReadable()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not readable or found on disk: " + fileEntity.getStoredFileName());
        }

        return fileEntity;
    }


    //---------------------------------------------------------
    // 3. 파일 Resource 로드 (다운로드 실행)
    //---------------------------------------------------------

    /**
     * 파일 경로를 기반으로 실제 파일 시스템에서 파일을 Resource 형태로 로드합니다.
     * @param filePath NoticesFile Entity에 저장된 파일 시스템 경로
     * @return 실제 파일 데이터를 담고 있는 Spring Resource 객체
     */
    public Resource getFileResource(String filePath) {
        try {
            // 경로를 정규화하여 보안상 문제 방지
            Path path = Paths.get(filePath).normalize();
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                // 파일을 찾을 수 없거나 읽을 수 없을 때 예외 발생
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not read file: " + filePath);
            }
        } catch (MalformedURLException e) {
            // 파일 경로가 잘못되었을 때 예외 발생
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File path error: " + filePath, e);
        }
    }

    //---------------------------------------------------------
    // 4. 파일 삭제 로직
    //---------------------------------------------------------

    /**
     * 공지사항 삭제 시, 연결된 모든 파일을 파일 시스템에서 삭제하고 DB 레코드도 삭제합니다.
     * @param notices 삭제할 NoticesEntity (연결된 파일 목록을 가져옴)
     */
    @Transactional(readOnly = true) // 파일 목록 조회만 하므로 ReadOnly로 설정
    public void deleteFilesByNotices(NoticesEntity notices) {
        // NoticesEntity ID를 사용하여 연결된 모든 파일 레코드를 조회
        // Repository에 findByNoticesId 메서드가 정의되어 있어야 합니다.
        List<NoticesFile> filesToDelete = noticesFileRepository.findByNoticesId(notices.getId());

        if (filesToDelete.isEmpty()) {
            log.info("Notices ID {}에 연결된 삭제할 파일이 없습니다.", notices.getId());
            return;
        }

        log.info("Notices ID {}에 연결된 파일 {}개를 삭제합니다.", notices.getId(), filesToDelete.size());

        for (NoticesFile file : filesToDelete) {
            // deleteFileById를 호출하여 개별 파일 삭제 및 DB 레코드 삭제를 처리합니다.
            // REQUIRES_NEW 덕분에 전체 공지사항 삭제 트랜잭션과 독립적으로 처리됩니다.
            deleteFileById(file.getId());
        }
    }

    /**
     * 특정 NoticesFile Entity에 연결된 실제 파일 시스템 파일을 삭제합니다.
     * (순수 I/O 작업이므로 @Transactional을 제거했습니다.)
     */
    private void deleteFile(NoticesFile fileEntity) {
        try {
            File fileOnDisk = new File(fileEntity.getFilePath());
            if (fileOnDisk.exists() && fileOnDisk.delete()) {
                log.info("File successfully deleted from disk: {}", fileEntity.getFilePath());
            } else {
                log.warn("Failed to delete file from disk or file not found: {}", fileEntity.getFilePath());
            }
        } catch (Exception e) {
            log.error("Error deleting file: {}", fileEntity.getFilePath(), e);
        }
    }

    /**
     * 특정 파일 ID를 사용하여 DB 레코드를 삭제하고, 파일 시스템에서도 파일을 삭제합니다.
     * (예: 공지사항 수정 시 개별 파일 삭제용)
     * * [핵심] Propagation.REQUIRES_NEW를 사용하여 상위 트랜잭션의 롤백과 무관하게
     * 파일 삭제를 즉시 커밋합니다.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteFileById(Long fileId) {
        NoticesFile fileEntity = noticesFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found with id: " + fileId));

        // 1. 파일 시스템에서 삭제 (물리적 삭제)
        deleteFile(fileEntity);

        // 2. DB 레코드 삭제 (DB 레코드 삭제 명령)
        noticesFileRepository.delete(fileEntity);
        log.info("File record deleted from DB: fileId={}", fileId);
    }
}