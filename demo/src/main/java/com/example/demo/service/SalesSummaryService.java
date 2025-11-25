package com.example.demo.service;

import com.example.demo.domain.dto.SalesSummaryResponseDto;
import com.example.demo.domain.dto.Vo.SalesSummaryVo;
import com.example.demo.mapper.SalesSummaryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//Mapper를 주입받아 데이터 조회하고 DTO로 변환하는 로직 담당
@Service
@RequiredArgsConstructor
public class SalesSummaryService {

    private final SalesSummaryMapper salesSummaryMapper;

    /**
     * 자치구와 분기 코드를 받아 매출 요약 정보를 조회하고 DTO로 변환
     */
    public SalesSummaryResponseDto getSummary(String guName, String qtrCode) {

        // 1. Mapper를 호출하여 DB에서 VO를 조회
        SalesSummaryVo vo = salesSummaryMapper.getSalesSummary(guName, qtrCode);

        // 2. VO를 DTO로 변환 (비즈니스 로직)
        SalesSummaryResponseDto dto = new SalesSummaryResponseDto();

        // 현재는 단순 매핑이지만, 여기서 추가적인 가공 로직이 삽입 가능
        dto.setMonthlyAverageSales(vo.getMonthlyAverageSales());
        dto.setQoqChange(vo.getQoqChange());
        dto.setYoyChange(vo.getYoyChange());

        return dto;
    }
}
