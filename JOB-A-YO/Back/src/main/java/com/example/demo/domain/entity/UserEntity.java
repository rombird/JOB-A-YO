package com.example.demo.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_table")
public class UserEntity {
    // 1. id: 고유 식별 기본 키 (Primary Key)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. username: 로그인 시 사용되는 아이디 (고유해야 함)
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    // 3. password: 해시 처리된 비밀번호
    // DB 컬럼 이름은 "password"가 됩니다. (password_hash가 필요한 경우 @Column(name="password_hash")가 필요)
    @Column(nullable = false)
    private String password;

    // 4. email: 사용자의 이메일 주소 (고유 설정 및 필수)
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    // 5. firstName: 이름 (DB 컬럼명은 "first_name" 또는 "firstName"으로 자동 매핑 규칙에 따라 결정됨)
    @Column(length = 50)
    private String firstName;

    // 6. lastName: 성
    @Column(length = 50)
    private String lastName;

    // 7. createdAt: 계정 생성 일시
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // 8. updatedAt: 마지막 정보 수정 일시
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // 9. role: 사용자의 권한 수준 (ADMIN, USER 등)
    @Column(nullable = false, length = 20)
    private String role;

    // 10. isActive: 계정의 활성화 상태
    @Column(nullable = false)
    private Boolean isActive = true;
}
