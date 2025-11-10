package com.example.demo.controller;

import com.example.demo.domain.dto.BoardDto;
import com.example.demo.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    public String findById(@PathVariable Long id, Model model,
                           @PageableDefault(page = 1)Pageable pageable) {
        // 해당 게시글의 조회수를 하나 늘리고
        // 게시글 데이터를 가져와서 detail.html에 출력
        boardService.updateHits(id);
        BoardDto boardDto = boardService.findById(id);
        model.addAttribute("board", boardDto);
        model.addAttribute("page", pageable.getPageNumber());
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

    @Operation(summary = "boardDeleteGet", description = "게시글 삭제 Get 요청")
    @GetMapping("/board/delete/{id}")
    public String delete(@PathVariable Long id){
        log.info("GET/ board/delete/{id}... 게시글 지우기 boardController");

        boardService.delete(id);
        return "redirect:/board";
    }

    // 이런식으로 요청 날릴거야/board/paging?/page=1
    @GetMapping("/board/paging")
    public String paging(@PageableDefault(page = 1)Pageable pageable, Model model){     // @PageableDefault(page = 1) -> 기본적으로 1페이지 보여줄래
        log.info("GET/board/paging... 페이징처리 BoardController");
        Page<BoardDto> boardList = boardService.paging(pageable);

        int blockLimit = 3;
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) -1) * blockLimit + 1; // 1, 4, 7,
        int endPage = ((startPage + blockLimit - 1) < boardList.getTotalPages()) ? startPage + blockLimit - 1 : boardList.getTotalPages();

        // page 갯수 20개
        // 현재 사용자각 3페이지
        // 보여지는 페이지1 2 3
        // 현재 사용자가 5페이지라면 5, 6, 7
        // 보여지는 페이지 갯수 3개

        model.addAttribute("boardList" , boardList);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "board/paging";
    }

}
