package com.example.demo.domain.dto;

import com.example.demo.domain.entity.UserEntity;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.swing.*;
import java.util.Collection;
import java.util.Collections;

//Security가 my DB에서 사용자를 로드하고 권한 부여에 필수적
//DB에서 가져온 사용자 정보를 Spring Security가 사용하는 형태로 변환해주는 역할
//Spring Security가 DB에서 사용자 정보를 읽어들이고 이를 바탕으로 인증 및 권한 부여를 수행하는 데 필요한 변환 작업을 담당하는 클래스


public class CustomUserDetails implements UserDetails {

    private final UserEntity userEntity;

    // ---------------------------------------------------------------------------------
    // UserRestController의 /me 엔드포인트에서 사용될 추가 정보 게터
    // ---------------------------------------------------------------------------------

    /**
     * 사용자의 소셜 로그인 여부를 반환
     */
    public Boolean getIsSocial() {
        return userEntity.getIsSocial();
    }

    /**
     * 사용자의 닉네임을 반환
     */
    public String getNickname() {
        return userEntity.getNickname();
    }

    /**
     * 사용자의 이메일을 반환
     */
    public String getEmail() {
        return userEntity.getEmail();
    }

    // UserEntity를 받아 초기화하는 생성자
    public CustomUserDetails(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    // DB의 UserRoleType을 Spring Security의 권한 객체로 변환 (ROLE_ADMIN, ROLE_USER 등)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // UserRoleType Enum 이름을 "ROLE_" 접두사와 결합하여 SimpleGrantedAuthority 객체로 만듦
        return Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + userEntity.getRoleType().name())
        );
    }

    // 비밀번호 반환
    @Override
    public String getPassword() {
        return userEntity.getPassword();
    }

    // 사용자 이름 (ID) 반환
    @Override
    public String getUsername() {
        return userEntity.getUsername();
    }

    // 계정 만료 여부 (true: 만료 안됨)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠금 여부 (true: 잠금 안됨)
    @Override
    public boolean isAccountNonLocked() {
        // DB의 isLock 필드 사용
        return !userEntity.getIsLock();
    }

    // 비밀번호 만료 여부 (true: 만료 안됨)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정 활성화 여부 (true: 활성화됨)
    @Override
    public boolean isEnabled() {
        return true;
    }

    //추가 메서드: 인증 후 UserEntity 객체에 접근할 필요가 있을 때 사용
    public UserEntity getUserEntity() {
        return userEntity;
    }
}