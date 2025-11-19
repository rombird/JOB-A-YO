package com.example.demo.domain.service;

import com.example.demo.config.auth.jwt.JwtTokenProvider; // JWT 토큰 생성용 Provider
import com.example.demo.domain.dto.CustomOAuth2User;
import com.example.demo.domain.dto.TokenInfo; // 토큰 정보 DTO
import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.dto.UserResponseDto;
import com.example.demo.domain.entity.JwtToken; // DB에 토큰 저장용 Entity
import com.example.demo.domain.entity.SocialProviderType;
import com.example.demo.domain.entity.UserEntity;
import com.example.demo.domain.entity.UserRoleType;
import com.example.demo.domain.repository.JwtTokenRepository; // DB 토큰 관리용 Repository
import com.example.demo.domain.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@Slf4j
@Service
public class UserService extends DefaultOAuth2UserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    //  JWT 관련 필드 추가
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenRepository jwtTokenRepository;

    // 생성자 수정: 필요한 컴포넌트들 모두 주입
    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository,
                       AuthenticationManagerBuilder authenticationManagerBuilder,
                       JwtTokenProvider jwtTokenProvider, JwtTokenRepository jwtTokenRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.jwtTokenRepository = jwtTokenRepository;
    }


    // 자체 로그인 회원 가입 (존재 여부)
    @Transactional(readOnly = true)
    public Boolean existUser(UserDto dto) {
        return userRepository.existsByUsername(dto.getUsername());
    }

    // 자체 로그인 회원 가입 - username, email, nickname, password 받을 것
    @Transactional
    public Long addUser(UserDto dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("이미 유저가 존재합니다.");
        }
        UserEntity entity = UserEntity.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .isLock(false)
                .isSocial(false)
                .roleType(UserRoleType.USER)
                .nickname(dto.getNickname())
                .email(dto.getEmail())
                .build();

        return userRepository.save(entity).getId();
    }

    // 추가: JWT 토큰 발행을 위한 로그인 로직
    @Transactional
    public TokenInfo login(UserDto dto) {
        // 1. Username + Password 기반으로 Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());

        // 2. 실제 검증 (CustomUserDetailsService.loadUserByUsername 호출됨)
        // 이 시점에 비밀번호 검증이 완료됩니다.
        Authentication authentication =
                authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성 (Access Token, Refresh Token)
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        // 4. DB에 Refresh Token 저장 (기존 토큰은 삭제/업데이트)

        // 기존 토큰 정보가 있으면 삭제 (Clean-up)
        jwtTokenRepository.deleteByUsername(dto.getUsername());

        // 새로운 토큰 정보 저장
        JwtToken jwtToken = JwtToken.builder()
                .username(dto.getUsername())
                .accessToken(tokenInfo.getAccessToken())
                .refreshToken(tokenInfo.getRefreshToken())
                .auth(authentication.getAuthorities().stream().findFirst().get().getAuthority())
                .build();

        jwtTokenRepository.save(jwtToken);

        return tokenInfo;
    }
    // ----------------------------------------------------------------------


    // 자체 로그인 인증 로직 (Spring Security용)
    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity entity = userRepository.findByUsernameAndIsLockAndIsSocial(username, false, false)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        return User.builder()
                .username(entity.getUsername())
                .password(entity.getPassword())
                .roles(entity.getRoleType().name())
                .accountLocked(entity.getIsLock())
                .build();
    }

    // 자체 로그인 회원 정보 수정
    @Transactional
    public Long updateUser(UserDto dto) throws AccessDeniedException {
        String sessionUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!sessionUsername.equals(dto.getUsername())) {
            throw new AccessDeniedException("본인 계정만 수정 가능");
        }

        UserEntity entity = userRepository.findByUsernameAndIsLockAndIsSocial(dto.getUsername(), false, false)
                .orElseThrow(() -> new UsernameNotFoundException(dto.getUsername()));

        entity.updateUser(dto);

        return userRepository.save(entity).getId();
    }


    // 자체/소셜 로그인 회원 탈퇴
    @Transactional
    public void deleteUser(UserDto dto) throws AccessDeniedException {

        SecurityContext context = SecurityContextHolder.getContext();
        String sessionUsername = context.getAuthentication().getName();
        String sessionRole = context.getAuthentication().getAuthorities().iterator().next().getAuthority();

        boolean isOwner = sessionUsername.equals(dto.getUsername());
        boolean isAdmin = sessionRole.equals("ROLE_"+UserRoleType.ADMIN.name());

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("본인 혹은 관리자만 삭제할 수 있습니다.");
        }

        // 유저 제거
        userRepository.deleteByUsername(dto.getUsername());

        // Refresh 토큰 제거 (jwtService의 역할을 jwtTokenRepository가 수행)
        jwtTokenRepository.deleteByUsername(dto.getUsername());
    }


    // 소셜 로그인 (매 로그인시 : 신규 = 가입, 기존 = 업데이트)
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes;
        List<GrantedAuthority> authorities;
        String username;
        String role = UserRoleType.USER.name();
        String email;
        String nickname;
        String registrationId = userRequest.getClientRegistration().getRegistrationId().toUpperCase();

        if (registrationId.equals(SocialProviderType.NAVER.name())) {
            attributes = (Map<String, Object>) oAuth2User.getAttributes().get("response");
            username = registrationId + "_" + attributes.get("id");
            email = attributes.get("email").toString();
            nickname = attributes.get("nickname").toString();
        } else if (registrationId.equals(SocialProviderType.GOOGLE.name())) {
            attributes = (Map<String, Object>) oAuth2User.getAttributes();
            username = registrationId + "_" + attributes.get("sub");
            email = attributes.get("email").toString();
            nickname = attributes.get("name").toString();
        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다.");
        }

        Optional<UserEntity> entity = userRepository.findByUsernameAndIsSocial(username, true);
        if (entity.isPresent()) {
            role = entity.get().getRoleType().name();
            UserDto dto = new UserDto();
            dto.setNickname(nickname);
            dto.setEmail(email);
            entity.get().updateUser(dto);
            userRepository.save(entity.get());
        } else {
            UserEntity newUserEntity = UserEntity.builder()
                    .username(username)
                    .password("")
                    .isLock(false)
                    .isSocial(true)
                    .socialProviderType(SocialProviderType.valueOf(registrationId))
                    .roleType(UserRoleType.USER)
                    .nickname(nickname)
                    .email(email)
                    .build();
            userRepository.save(newUserEntity);
        }

        authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

        return new CustomOAuth2User(attributes, authorities, username);
    }


    // 자체/소셜 유저 정보 조회
    @Transactional(readOnly = true)
    public UserResponseDto readUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity entity = userRepository.findByUsernameAndIsLock(username, false)
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다: " + username));

        return new UserResponseDto(username, entity.getIsSocial(), entity.getNickname(), entity.getEmail());
    }

}