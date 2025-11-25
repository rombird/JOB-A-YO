package com.example.demo.service;

import com.example.demo.domain.dto.SalesSummaryResponseDto;
import com.example.demo.domain.entity.SalesSummary; // 패키지 경로 수정: com.example.demo.entity -> com.example.demo.domain.entity
import com.example.demo.repository.SalesSummaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

// SalesSummaryRepository를 주입받아 데이터 조회하고 DTO로 변환하는 로직 담당

@Service
@RequiredArgsConstructor
public class SalesSummaryService {

    // Mapper 대신 JPA Repository 주입
    private final SalesSummaryRepository salesSummaryRepository;

    /**
     * 자치구와 분기 코드를 받아 매출 요약 정보를 조회하고 DTO로 변환합니다.
     */
    public SalesSummaryResponseDto getSummary(String guName, String qtrCode) {

        // 1. Repository를 호출하여 DB에서 SalesSummary 엔티티를 조회
        // Optional을 사용하여 데이터가 없을 경우를 안전하게 처리합니다.
        SalesSummary entity = salesSummaryRepository.findByGuNameAndQtrCode(guName, qtrCode)
                .orElseThrow(() -> new NoSuchElementException(
                        "Sales summary data not found for guName: " + guName + " and qtrCode: " + qtrCode)
                );

        // 2. Entity를 DTO로 변환 (프론트엔드 응답 형식에 맞춤)
        // DTO에는 Builder 패턴이 적용되어 있다고 가정합니다. (이전 답변에서 DTO 생성 완료)
        SalesSummaryResponseDto dto = SalesSummaryResponseDto.builder()
                .guName(entity.getGuName())
                .qtrCode(entity.getQtrCode())
                // 월평균 매출액 계산 (분기 총합 / 3)
                .monthlyAverageSales(entity.getQuarterlyTotalSales() / 3.0)
                .qoqChange(entity.getQoqChange())
                .yoyChange(entity.getYoyChange())
                .build();

        return dto;
    }
}