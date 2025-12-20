package com.example.demo.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


// 파이썬 머신러닝 모델 값들을 받을 DTO
// model들의 키 값과 일치해야함
@Getter
@Setter
public class RevenuePredictionResponseDto {
    private String dong;
    private String sector;
    @JsonProperty("predicted_revenue")
    private Double predicted_revenue;
    private List<String> reasons;
}
