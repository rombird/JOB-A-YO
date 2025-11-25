package com.example.demo.domain.dto;

//React에 보낼 최종 JSON 구조


import lombok.Data;

@Data
public class SalesSummaryResponseDto {
    private long monthlyAverageSales; // 월평균_매출액
    private long qoqChange;           // 전분기_대비_증감액
    private long yoyChange;           // 전년_동분기_대비_증감액
}

