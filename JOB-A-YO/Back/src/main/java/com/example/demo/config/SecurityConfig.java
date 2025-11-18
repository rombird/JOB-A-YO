package com.example.demo.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

//Spring Security관련 설정 클래스
@Configuration
@EnableWebSecurity
@EnableMethodSecurity

public class SecurityConfig {

    //비밀번호 암호화
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //HTTP 요청에 대한 보안 필터 체인 설정(사용자가 요청을 보내면 Controller한테 가기 전에 여기서 낚아채서 검증)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        //공지사항 조회 경로는 인증없이 누구나 접근 가능
                        .requestMatchers("/notices/**", "/api/notices/**").permitAll()
                        //조회 외의 요청은 인증 필요(로그인 필수)
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exception -> exception

                                // [Case 1] 미인증 사용자 (로그인 X)가 보호된 리소스에 접근 시
                        // 403 Forbidden 상태 코드 반환 (권한 없음과 동일하게 처리)
                        .authenticationEntryPoint((request, response, authException) -> {

                            //REACT버전
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403 설정
                            response.setContentType("application/json;charset=UTF-8");
                            response.getWriter().write("{\"error\": \"Forbidden\", \"message\": \"접근 권한이 없습니다. 관리자 로그인이 필요합니다.\"}");

                            //SB통합버전
                            // 공지사항 목록으로 리다이렉트 (권한 없음 메시지 전달)
                            //response.sendRedirect("/notices?error=forbidden");
                        })


                        // [Case 2] 인증된 사용자지만 권한이 없는 경우 (@PreAuthorize 검증 실패)
                                .accessDeniedHandler((request, response, accessDeniedException) -> {
                                    // 403 Forbidden 상태 코드를 반환하도록 설정
                                    response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403 설정
                                    response.setContentType("application/json;charset=UTF-8");
                                    // 프론트엔드에서 이 JSON 응답을 받아 권한 없음 메시지를 표시
                                    response.getWriter().write("{\"error\": \"Forbidden\", \"message\": \"접근 권한이 없습니다. 관리자 로그인이 필요합니다.\"}");

                                    //SB통합버전
                                    // 공지사항 목록으로 리다이렉트 (권한 없음 메시지 전달)
                                    //response.sendRedirect("/notices?error=forbidden");
                                })
                )

                // 3. 기본 로그인 폼 비활성화 (Exception Handling이 대신 처리하므로)
                .formLogin(form -> form.disable()
                )
                .logout(logout->logout.permitAll());
        return http.build();
    }
}
