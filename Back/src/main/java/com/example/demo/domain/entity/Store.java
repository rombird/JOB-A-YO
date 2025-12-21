package com.example.demo.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "store")
@Getter
@NoArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dongName; // 행정동
    private String categoryName; // 업종 명
    private String storeChangeRate; // 점포 증감률
    private String competitionIndex; // 경쟁도 지수
    private String areaDensity; // 업종 면적 밀도
    private String populationPerStore; // 점포당 유동인구
    private String outlookGrade; // 전망등급

    public Store(String dongName, String categoryName, String storeChangeRate,
                 String competitionIndex, String areaDensity, String populationPerStore, String outlookGrade) {
        this.dongName = dongName;
        this.categoryName = categoryName;
        this.storeChangeRate = storeChangeRate;
        this.competitionIndex = competitionIndex;
        this.areaDensity = areaDensity;
        this.populationPerStore = populationPerStore;
        this.outlookGrade = outlookGrade;
    }

}
