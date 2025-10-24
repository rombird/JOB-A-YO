package com.example.demo.service;

import com.example.demo.dto.BoardDto;
import com.example.demo.entity.BoardEntity;
import com.example.demo.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// DTO -> Entity (Entity 클래스에서 할거임)
// Entity -> DTO(DTO클래스에서 할거임)

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public void save(BoardDto boardDto){
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDto);
        boardRepository.save(boardEntity);     // boardRepository는 파라미터로 entity객체만 받음. 그래서 dto <-> entity 작업이 필요

    }

    public List<BoardDto> findAll(){
        List<BoardEntity> boardEntityList = boardRepository.findAll();

        List<BoardDto> boardDtoList = new ArrayList<>();

        for(BoardEntity boardEntity: boardEntityList){
            boardDtoList.add(BoardDto.toBoardDto(boardEntity));
        }
        return boardDtoList;
    }

}
