package com.example.demo.domain.dto;

public record UserResponseDto(String username, Boolean social, String nickname, String email, String role) {
    //String Role : 이 필드를 통해 FE가 'ADMIN' 여부를 확인
}