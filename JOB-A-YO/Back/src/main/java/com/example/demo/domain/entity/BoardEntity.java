package com.example.demo.domain.entity;

import com.example.demo.domain.dto.BoardDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Board DB의 테이블 역할을 하는 클래스
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board_table")
public class BoardEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 ID 생성
    private Long id;

    @Column(nullable = false)
    private String boardWriter;

    @Column(nullable = false)
    private String boardPass;

    @Column(nullable = false)
    private String boardTitle;

    @Column(nullable = false, length = 500)
    private String boardContents;

    @Column
    private int boardHits;

    @Column
    private int fileAttached; // 1 or 0

    public static BoardEntity toSaveEntity(BoardDto boardDto){
        BoardEntity boardEntity = new BoardEntity();

        boardEntity.setBoardWriter(boardDto.getBoardWriter());
        boardEntity.setBoardPass(boardDto.getBoardPass());
        boardEntity.setBoardHits(0);
        boardEntity.setBoardTitle(boardDto.getBoardTitle());
        boardEntity.setBoardContents(boardDto.getBoardContents());
        boardEntity.setFileAttached(0); // 파일 없음,

        return boardEntity;
    }

    // JPA는 id값의 유무에 따라 update인지 insert인지 결정한다
    public static BoardEntity toUpdateEntity(BoardDto boardDto){
        BoardEntity boardEntity = new BoardEntity();

        boardEntity.setId(boardDto.getId());
        boardEntity.setBoardWriter(boardDto.getBoardWriter());
        boardEntity.setBoardPass(boardDto.getBoardPass());
        boardEntity.setBoardHits(boardDto.getBoardHits());
        boardEntity.setBoardTitle(boardDto.getBoardTitle());
        boardEntity.setBoardContents(boardDto.getBoardContents());

        return boardEntity;
    }

}
