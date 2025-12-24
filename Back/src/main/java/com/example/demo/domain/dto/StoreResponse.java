package com.example.demo.domain.dto;

public record StoreResponse (
    String dongName,
    String category,
    double storeChangeRate,
    String storeChangeComment,
    double competitionIndex,
    String competitionComment,
    double areaDensity,
    String areaDensityComment,
    double populationPerStore,
    String populationComment,
    String outlookGrade,
    String summary
){}
