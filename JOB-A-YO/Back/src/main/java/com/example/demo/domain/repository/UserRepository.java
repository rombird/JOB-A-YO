package com.example.demo.domain.repository;

import com.example.demo.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    // 사용자 이름(username)으로 DB에서 User Entity를 조회
    Optional<UserEntity> findByUsername(String username);
}
