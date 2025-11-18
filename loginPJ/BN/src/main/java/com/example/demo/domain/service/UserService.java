package com.example.demo.domain.service;

import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.entity.UserEntity;
import com.example.demo.domain.entity.UserRoleType;
import com.example.demo.domain.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    private UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // 자체 로그인 회원 가입 (존재 여부)
    @Transactional(readOnly = true)
    public Boolean existUser(UserDto dto) {
        return userRepository.existsByUsername(dto.getUsername());
    }

    // 자체 로그인 회원 가입 - username, email, nickname, password 받을 것
    @Transactional
    public Long addUser(UserDto dto) { // 회원가입을 완료했을 때 id 값만 리턴하려고 Long

        // 앞에서 유저확인은 프론트엔드용으로 안전하게 한번 더 검증
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("이미 유저가 존재합니다.");
        }
        // 사용자가 가입이 되어있지 않다면 회원가입
        UserEntity entity = UserEntity.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .isLock(false)
                .isSocial(false)
                .roleType(UserRoleType.USER) // 우선 일반 유저로 가입
                .nickname(dto.getNickname())
                .email(dto.getEmail())
                .build();

        return userRepository.save(entity).getId();
    }
    // 자체 로그인
    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity entity = userRepository.findByUsernameAndIsLockAndIsSocial(username, false, false)
                .orElseThrow(() -> new UsernameNotFoundException(username)); // 없다면

        // 있다면 return
        return User.builder()
                .username(entity.getUsername())
                .password(entity.getPassword())
                .roles(entity.getRoleType().name())
                .accountLocked(entity.getIsLock())
                .build();
    }

    // 자체 로그인 회원 정보 수정
    // 자체 로그인 여부 or 잠김여부(계정이 잠겨있는지 확인)
    @Transactional
    public Long updateUser(UserDto dto) throws AccessDeniedException {

        // 본인만 수정 가능 검증
        String sessionUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!sessionUsername.equals(dto.getUsername())) {
            throw new AccessDeniedException("본인 계정만 수정 가능");
        }

        // 조회(username이 있는지, isLock인지, isSocial인지 확인하고 수정할 수 있도록)
        UserEntity entity = userRepository.findByUsernameAndIsLockAndIsSocial(dto.getUsername(), false, false)
                .orElseThrow(() -> new UsernameNotFoundException(dto.getUsername()));

        // 회원 정보 수정
        entity.updateUser(dto);

        return userRepository.save(entity).getId();
    }




    // 자체/소셜 로그인 회원 탈퇴

    // 소셜 로그인 (매 로그인시 : 신규 = 가입, 기존 = 업데이트)

    // 자체/소셜 유저 정보 조회


}
