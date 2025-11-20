package com.example.demo.domain.dto;

import com.example.demo.domain.entity.NoticesEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class NoticesDto {
    private Long id;
    private String author;
    private String noticesTitle;
    private String noticesContents;
    private int noticesView;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    //Entity -> Dto 변환(클라이언트 응답)
    public static NoticesDto fromEntity(NoticesEntity noticesEntity){
     return NoticesDto.builder()
             .id(noticesEntity.getId())
             .author(noticesEntity.getAuthor())
             .noticesTitle(noticesEntity.getNoticesTitle())
             .noticesContents(noticesEntity.getNoticesContents())
             .noticesView(noticesEntity.getNoticesViews())
             .createdTime(noticesEntity.getCreatedTime())
             .updatedTime(noticesEntity.getUpdatedTime())
             .build();

    }

}
