package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;


//CORS 설정 - REACT와의 통신 허용
// React 분리 버전 사용 시 필수 설정
@Configuration
public class WebConfig implements WebMvcConfigurer {

    //CORS 설정을 Bean으로 등록하여 SecurityConfig에서 사용
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        //허용할 도메인 설정
        //localhost:3000과 8080
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));

        //허용할 HTTP 헤더
        configuration.setAllowedHeaders(List.of("*"));

        //클라이언트가 자격 증명(쿠키, 인증 헤더)를 포함하여 요청할 수 있도록
        configuration.setAllowCredentials(true);

        //모든 URL 패턴에 대한 CORS 설정 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}