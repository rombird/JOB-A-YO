package com.example.demo.service;

import com.example.demo.domain.dto.StoreRequest;
import com.example.demo.domain.dto.StoreResponse;
import com.example.demo.domain.entity.Store;
import com.example.demo.domain.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    private static final double HIGH_GROWTH_RATE = 0.05;
    private static final double HIGH_COMPETITION = 1.2;
    private static final double MID_COMPETITION = 0.8;
    private static final double HIGH_DENSITY = 40;
    private static final double MID_DENSITY = 20;
    private static final double HIGH_POPULATION = 300_000;
    private static final double MID_POPULATION = 150_000;

    private String interpretStoreChange(double rate) {
        // 0보다 크면 시장이 성장 중일 가능성, 0에 가까우면 안정단계, 0보다 작으면 점포감소
        if (rate > HIGH_GROWTH_RATE) return "최근 점포 수가 증가 중으로 성장 가능성이 있습니다.";
        if (rate > 0) return "점포 수가 소폭 증가하며 안정적인 흐름입니다.";
        return "점포 수가 감소 추세로 신중한 접근이 필요합니다.";
    }

    private String interpretCompetition(double comp) {
        // 1보다 클수록 경쟁 치열, 1에 가까우면 평균 경쟁수준, 1보다 작으면 경쟁완화
        if (comp> HIGH_COMPETITION) return "경쟁이 치열한 편으로 차별화 전략이 필요합니다.";
        if (comp >= MID_COMPETITION) return "경쟁 수준이 평균적인 편입니다.";
        return "경쟁이 비교적 낮아 신규 진입에 유리합니다.";
    }
    private String interpretAreaDensity(double density) {
        // 높을수록 상권집중도 높음, 낮을수록 분산된 상권
        if (density > HIGH_DENSITY) return "업종 점포가 매우 밀집되어 경쟁이 치열한 상권입니다.";
        if (density > MID_DENSITY) return "업종 젚모가 비교적 밀집된 지역입니다.";
        return "업종 점포 밀도가 낮아 틈새 상권일 가능성이 있습니다.";
    }
    private String interpretPopulation(double value){
        // 높을수록 수요대비 점포수 적음, 낮을수록 점포수 대비 수요 부족 가능성
        if (value > HIGH_POPULATION) return "점포 1곳당 잠재 고객 수가 충분한 편입니다.";
        if (value > MID_POPULATION) return "점포당 유동인구가 평균적인 수준입니다.";
        return "점포 수 대비 유동인구가 적어 매출 확보에 주의가 필요합니다.";
    }

    private String buildSummary(double rate, double comp, double density) {
        if (rate > 0 && comp < 1)
            return "점포 수가 증가 중이며 경쟁이 낮아 신규 진입에 유리한 상권입니다.";
        if (rate > 0 && comp >= 1)
            return "성장 가능성은 있으나 경쟁이 존재해 차별화 전략이 필요합니다.";
        return "전반적으로 신중한 접근이 요구되는 상권입니다.";
    }

    public StoreResponse getAnalysis(StoreRequest request) {
        Store s = storeRepository
                .findByDongNameAndCategoryName(request.regionName(), request.category())
                .orElseThrow(() -> new RuntimeException("분석 데이터 없음"));

        double changeRate = Double.parseDouble(s.getStoreChangeRate());
        double compIndex = Double.parseDouble(s.getCompetitionIndex());
        double areaDen = Double.parseDouble(s.getAreaDensity());
        double popPerStore = Double.parseDouble(s.getPopulationPerStore());

        return new StoreResponse(
                s.getDongName(),
                s.getCategoryName(),
                changeRate,
                interpretStoreChange(changeRate),
                compIndex,
                interpretCompetition(compIndex),
                areaDen,
                interpretAreaDensity(areaDen),
                popPerStore,
                interpretPopulation(popPerStore),
                s.getOutlookGrade(),
                buildSummary(changeRate, compIndex, areaDen)
        );


    }


}
