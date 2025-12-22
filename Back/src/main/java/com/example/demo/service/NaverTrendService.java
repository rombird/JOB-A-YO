package com.example.demo.service;


import com.example.demo.domain.dto.NaverTrendRequestDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

@Service
public class NaverTrendService {
    private final String CLIENT_ID = "8GtSqzs2GMOpCNacuZqx";
    private final String CLIENT_SECRET = "QDvbg8ble_";
    private final String API_URL = "https://openapi.naver.com/v1/datalab/search";

    public String getTrendData(NaverTrendRequestDto naverTrendRequestDto) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", CLIENT_ID);
        headers.set("X-Naver-Client-Secret", CLIENT_SECRET);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 객체(requestDto)를 바로 전달
        HttpEntity<NaverTrendRequestDto> entity = new HttpEntity<>(naverTrendRequestDto, headers);

        return restTemplate.postForObject(API_URL, entity, String.class);
    }

}

