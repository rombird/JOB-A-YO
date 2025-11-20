package com.example.demo.domain.dto;

import com.example.demo.domain.entity.NoticesFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 공지사항 첨부 파일 정보를 클라이언트에게 전달하기 위한 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticesFileDto {
    private Long id; // 파일 다운로드/삭제에 사용될 파일의 고유 ID
    private String originalFileName; // 사용자에게 보여줄 파일 이름

    // Entity -> Dto 변환 메서드
    public static NoticesFileDto fromEntity(NoticesFile entity) {
        return NoticesFileDto.builder()
                .id(entity.getId())
                .originalFileName(entity.getOriginalFileName())
                .build();
    }
}