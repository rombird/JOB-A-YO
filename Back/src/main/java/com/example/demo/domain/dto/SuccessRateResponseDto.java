package com.example.demo.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class SuccessRateResponseDto {
    private String dong;
    private String sector;
    private double success_probability;
    private Map<String, Object> metrics; // 점포 수, 유동인구 등 상세 지표
}
