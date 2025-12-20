package com.example.demo.service;

import com.example.demo.domain.dto.RevenuePredictionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Service
public class AnalysisService {

    private final RestTemplate restTemplate;


    public RevenuePredictionResponseDto getPrediction(String dong, String sector){

        // FastAPI 주소(쿼리 파라미터 포함해야함)
        URI uri = UriComponentsBuilder
                .fromHttpUrl("http://localhost:8000/predict")
                .queryParam("dong_name", dong)
                .queryParam("sector_name", sector)
                .build()
                .encode()
                .toUri();

        try{
            return restTemplate.getForObject(uri, RevenuePredictionResponseDto.class);
        } catch (Exception e){
            // 에러 처리 (FastAPI 서버가 꺼져있거나 해당 데이터가 없을 시)
            throw new RuntimeException("AI 모델 서버 연결 실패: " + e.getMessage());
        }
    }
}
