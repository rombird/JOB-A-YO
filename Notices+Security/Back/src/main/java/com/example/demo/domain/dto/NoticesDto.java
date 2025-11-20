package com.example.demo.domain.dto;

import com.example.demo.domain.entity.NoticesEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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

    //첨부 파일 목록 담는 필드
    private List<NoticesFileDto> files;

    //DTO에 파일 정보 추가하는 메서드(Service에서 사용)
    public NoticesDto addFiles(List<NoticesFileDto> fileList){
        this.files = fileList;
        return this;
    }

}
