package com.example.demo.domain.dto;

import com.example.demo.domain.entity.BoardFileEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BoardFileDto {
    private Long id;
    private String originalFilename;
    private String storedFilename;

    // Entity -> Dto 변환 메서드
    public static BoardFileDto toBoardFileDto(BoardFileEntity boardFileEntity){
        BoardFileDto boardFileDto = new BoardFileDto();

        boardFileDto.setId(boardFileEntity.getId());
        boardFileDto.setOriginalFilename(boardFileEntity.getOriginalFilename());
        boardFileDto.setStoredFilename(boardFileEntity.getStoredFilename());

        return boardFileDto;
    }

//    // Entity -> Dto 변환 메서드
//    public BoardFileDto toBoardFileDto(BoardFileEntity boardFileEntity){
//        BoardFileDto boardFileDto = new BoardFileDto();
//
//        boardFileDto.setId(boardFileEntity.getId());
//        boardFileDto.setOriginalFileName(boardFileEntity.getOriginalFileName());
//        boardFileDto.setStoredFileName(boardFileEntity.getStoredFileName());
//
//        return boardFileDto;
//    }

}
