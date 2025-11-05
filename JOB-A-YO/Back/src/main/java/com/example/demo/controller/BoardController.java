package com.example.demo.controller;

import com.example.demo.dto.BoardDto;
import com.example.demo.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Slf4j
//@RequestMapping("/board")
@RequiredArgsConstructor
@Tag(name = "BoardController", description = "게시판")
public class BoardController {

    private final BoardService boardService;


    // 게시글 목록 페이지
    @Operation(summary = "board", description = "게시판목록")
    @GetMapping("/board")
    public String findAll(Model model){
        // DB에서 전체 게시글 데이터를 가져와서 board.html에 보여준다
        log.info("GET /board 게시글 목록 페이지");

        List<BoardDto> boardDtoList =  boardService.findAll();
        model.addAttribute("boardList", boardDtoList);
        return "board/board";
    }

    // 글쓰기 페이지 이동
    @Operation(summary = "writeBoard", description = "글쓰기 페이지 이동")
    @GetMapping("/board/writeBoard")
    public String writeForm(){
        log.info("Get/ writeBoard 게시판 글쓰기");

        return"board/writeBoard";
    }

    // 글쓴거 포스팅
    @Operation(summary = "writeBoardPost", description = "글 쓴거 DB로 보냄")
    @PostMapping("/board/writeBoard")
    public String write(@ModelAttribute BoardDto boardDto){
        System.out.println("boardDto:" +boardDto);
        boardService.save(boardDto);

        return "redirect:/board";
    }

    // 게시글 조회
    @Operation(summary = "boardDetail", description = "게시글 단건 조회")
    @GetMapping("/board/{id}")
    public String findById(@PathVariable Long id, Model model){
        // 해당 게시글의 조회수를 하나 늘리고
        // 게시글 데이터를 가져와서 detail.html에 출력
        boardService.updateHits(id);
        BoardDto boardDto = boardService.findById(id);
        model.addAttribute("board", boardDto);

        return "board/detail";
    }

    // 게시글 수정 (Update)
    @Operation(summary = "boardUpdate", description = "게시글 수정 ")
    @GetMapping("/board/update/{id}")
    public String updateForm(@PathVariable Long id, Model model){
        BoardDto boardDto = boardService.findById(id);
        model.addAttribute("boardUpdate", boardDto);

        return "board/update";
    }

    @Operation(summary = "boardUpdatePost", description = "게시글 수정 포스팅")
    @PostMapping("/board/update")
    public String update(@ModelAttribute BoardDto boardDto, Model model){
        log.info("post/ board/update... 게시판 업데이트 포스팅");

        BoardDto board = boardService.update(boardDto);
        model.addAttribute("board", board);

        System.out.println("contents = " + boardDto.getBoardContents());
        return "redirect:/board/" + boardDto.getId(); // 게시글 상세페이지로 이동
    }


}
