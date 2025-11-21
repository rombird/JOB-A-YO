package com.example.demo.domain.repository;

import com.example.demo.domain.entity.NoticesFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticesFileRepository extends JpaRepository<NoticesFile, Long> {
    // 공지사항 ID로 파일 목록을 조회하는 메서드 (상세 보기에서 사용)
    List<NoticesFile> findByNoticesId(Long noticesId);

}