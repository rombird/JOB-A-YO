package com.example.demo.domain.dto;


import com.example.demo.domain.entity.BoardEntity;
import com.example.demo.domain.entity.BoardFileEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private Long id;
    private String boardWriter;
    private String boardPass;
    private String boardTitle;
    private String boardContents;
    private int boardHits;
    private LocalDateTime boardCreateTime;
    private LocalDateTime boardUpdateTime;

    // 파일 업로드 관련
    private List<MultipartFile> fileUpload; // 파일 담는 용도
    private List<String> originalFilename; // 원본 파일 이름
    private List<String> storedFilename; // 서버 저장용 파일 이름
    private int fileAttached;   // 파일 첨부 여부(첨부 1, 미첨부 0)

    public BoardDto(Long id, String boardWriter, String boardTitle, int boardHits, LocalDateTime boardCreateTime) {
        this.id = id;
        this.boardWriter = boardWriter;
        this.boardTitle = boardTitle;
        this.boardHits = boardHits;
        this.boardCreateTime = boardCreateTime;

    }


    public static BoardDto toBoardDto(BoardEntity boardEntity){
        BoardDto boardDto = new BoardDto();

        boardDto.setId(boardEntity.getId());
        boardDto.setBoardWriter(boardEntity.getBoardWriter());
        boardDto.setBoardPass(boardEntity.getBoardPass());
        boardDto.setBoardContents(boardEntity.getBoardContents());
        boardDto.setBoardHits(boardEntity.getBoardHits());
        boardDto.setBoardTitle(boardEntity.getBoardTitle());
        boardDto.setBoardCreateTime(boardEntity.getCreatedTime());
        boardDto.setBoardUpdateTime(boardEntity.getUpdatedTime());

        Integer fileAttached = boardEntity.getFileAttached();   // 파일 유무 감지기
        int fileAttachStatus = (fileAttached == null)? 0 : fileAttached.intValue();
        boardDto.setFileAttached(fileAttachStatus);         // 없으면 0 또는 있으면 1

        List<String> originalFileNameList = new ArrayList<>();
        List<String> storedFileNameList = new ArrayList<>();

        if(fileAttachStatus == 1){  // 파일이 첨부된 경우
            List<BoardFileEntity> fileEntities = boardEntity.getBoardFileEntityList();

            if(fileEntities != null && !fileEntities.isEmpty()){
                // 파일 엔티티 목록이 존재하고 비어있지 않은 경우에만 처리
                for(BoardFileEntity boardFileEntity : fileEntities){
                    originalFileNameList.add(boardFileEntity.getOriginalFileName());
                    storedFileNameList.add(boardFileEntity.getStoredFileName());
                }
            }

        }

        boardDto.setOriginalFilename(originalFileNameList);
        boardDto.setStoredFilename(storedFileNameList);

        return boardDto;
    }

}
