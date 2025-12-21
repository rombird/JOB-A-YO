package com.example.demo.service;

import com.example.demo.domain.dto.StoreRequest;
import com.example.demo.domain.entity.Store;
import com.example.demo.domain.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    public String getAnalysisSentence(StoreRequest request){
        return storeRepository.findByDongNameAndCategoryName(request.regionName(), request.category())
                .map(s -> {
                    try {
                        // String 타입을 double로 변환 (소수점 처리를 위해)
                        double changeRate = Double.parseDouble(s.getStoreChangeRate());
                        double compIndex = Double.parseDouble(s.getCompetitionIndex());
                        double areaDen = Double.parseDouble(s.getAreaDensity());
                        double popPerStore = Double.parseDouble(s.getPopulationPerStore());

                        // %.2f 를 사용하여 소수점 둘째 자리까지 제한
                        return String.format(
                                "%s의 %s 업종 분석: 점포 증감률 %.2f, 경쟁도 지수 %.2f, 업종 면적 밀도 %.2f, 점포당 유동인구 %.2f, 예상 전망 등급은 %s입니다.",
                                s.getDongName(), s.getCategoryName(), changeRate, compIndex, areaDen, popPerStore, s.getOutlookGrade()
                        );
                    } catch (Exception e) {
                        // 숫자 변환 실패 시 기존 문자열 그대로 출력 (안전장치)
                        return String.format("%s의 %s 업종 분석 결과... (데이터 형식 오류)", s.getDongName(), s.getCategoryName());
                    }
                })
                .orElse("해당 지역 및 업종에 대한 분석 데이터가 존재하지 않습니다.");
    }

}
