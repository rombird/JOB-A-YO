package com.example.demo.domain.service;

import com.example.demo.domain.entity.NoticesEntity;
import com.example.demo.domain.entity.NoticesFile;
import com.example.demo.domain.repository.NoticesFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoticesFileService {

    // 💡 [핵심] Repository 인터페이스를 인스턴스 변수로 주입받습니다.
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
    // 2. 파일 메타 정보 조회 (다운로드 준비) - 오류 해결 부분
    //---------------------------------------------------------

    /**
     * 파일 ID로 DB에서 NoticesFile 메타 정보를 조회합니다.
     * @param fileId 다운로드할 파일의 DB ID
     * @return NoticesFile 객체 (파일 경로 및 이름 정보 포함)
     */
    public NoticesFile getFileMetadata(Long fileId) {
        // 💡 [수정 완료] 주입받은 인스턴스 변수(noticesFileRepository)를 사용합니다.
        return noticesFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found with id: " + fileId));
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
                throw new RuntimeException("Could not read file: " + filePath);
            }
        } catch (MalformedURLException e) {
            // 파일 경로가 잘못되었을 때 예외 발생
            throw new RuntimeException("File path error: " + filePath, e);
        }
    }
}