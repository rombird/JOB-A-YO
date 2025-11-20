package com.example.demo.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;


@Entity
@Table(name = "notices_file")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticesFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 클라이언트가 업로드한 파일 이름 (예: cat.jpg)
    private String originalFileName;

    // 서버에 실제로 저장된 중복 방지 파일 이름 (예: UUID_cat.jpg)
    private String storedFileName;

    // 파일 시스템 저장 경로 (예: C:/upload/notices/UUID_cat.jpg)
    private String filePath;

    // 파일 크기 (바이트)
    private long fileSize;

    // N:1 관계 설정: 여러 파일이 하나의 공지사항에 속함
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notices_id", nullable = false)
    private NoticesEntity notices;
}