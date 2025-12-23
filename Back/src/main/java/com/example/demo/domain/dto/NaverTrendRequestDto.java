package com.example.demo.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NaverTrendRequestDto {
    private String startDate;
    private String endDate;
    private String timeUnit;  // date, week, month
    private List<KeywordGroup> keywordGroups;

    @Getter
    @Setter
    public static class KeywordGroup{
        private String groupName;
        private List<String> keywords;
    }
}
