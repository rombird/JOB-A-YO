package com.example.demo.config.auth.jwt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {
    // refresh가 존재하는지
    Boolean existsByRefresh(String refreshToken);

    // Refresh 토큰 기반 삭제 메소드
    @Transactional
    void deleteByRefresh(String refresh);

    // username 기반 삭제 메소드(탈퇴시)
    @Transactional
    void deleteByUsername(String username);
}
