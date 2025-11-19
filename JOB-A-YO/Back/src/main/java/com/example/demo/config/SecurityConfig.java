package com.example.demo.config;

import com.example.demo.config.auth.jwt.JWTAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // JWTAuthorizationFilter를 생성자 주입으로 받아옵니다. (image_77b9a3.png 오류 해결)
    private final JWTAuthorizationFilter jwtAuthorizationFilter;

    // Cors 설정 주입 (CORS Bean을 사용하여 SecurityFilterChain에서 바로 정의)
     private final CorsConfigurationSource corsConfigurationSource; // 제거 가능


    // 비밀번호 암호화 Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // HTTP 요청에 대한 보안 설정 (메인 로직)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF 비활성화 (JWT를 사용하므로 세션에 의존하지 않음)
                .csrf(AbstractHttpConfigurer::disable)

                // 폼 로그인 및 HTTP Basic 인증 비활성화 (JWT 사용)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)

                // 세션 관리: STATELESS 설정 (세션을 생성하거나 사용하지 않음 = JWT 방식)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                //corsConfigurationSource 빈을 이용한 CORS 설정 적용
                .cors(cors -> cors.configurationSource(corsConfigurationSource)) // **메서드 호출이 아닌 필드를 직접 사용**
                // URL 접근 권한 설정
                .authorizeHttpRequests(authorize -> authorize
                        // 로그인, 회원가입, 소셜 로그인 진입점, 토큰 갱신 등은 인증 없이 접근 허용
                        .requestMatchers(
                                "/api/user/signup",
                                "/api/user/login",
                                "/login/**", // 소셜 로그인 진입점
                                "/oauth2/**" // 소셜 로그인 리다이렉션
                        ).permitAll()

                        // 그 외 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                )

                // JWT 필터 등록
                // UsernamePasswordAuthenticationFilter 이전에 JWTAuthorizationFilter를 실행
                // -> 모든 요청 전에 토큰의 유효성을 검사하고 인증 정보를 SecurityContext에 저장
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}