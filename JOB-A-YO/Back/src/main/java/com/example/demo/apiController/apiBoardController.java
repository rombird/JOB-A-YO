package com.example.demo.apiController;

import com.example.demo.domain.dto.BoardDto;
import com.example.demo.service.BoardService;
import com.example.demo.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "apiBoardController", description = "게시판 REST API")
@RequestMapping("/api/board")
public class apiBoardController {

    private final BoardService boardService;
    private final CommentService commentService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.5.7:3000"})
    @Operation(summary = "PagingList", description = "게시글 목록 및 페이징 정보")
    @GetMapping("/paging")
    public ResponseEntity<?> paging(
            @PageableDefault(page = 1, size = 11) Pageable pageable){     // @PageableDefault(page = 1) -> 기본적으로 1페이지 보여줄래
        log.info("GET  /api/board/paging... 페이징처리 REST API");
        Page<BoardDto> boardList = boardService.paging(pageable);

        int blockLimit = 11;
        // React에서 startPage, endPage 계산에 필요한 정보를 함께 JSON으로 반환
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) -1) * blockLimit + 1; // 1, 4, 7,
        int endPage = ((startPage + blockLimit - 1) < boardList.getTotalPages()) ? startPage + blockLimit - 1 : boardList.getTotalPages();

        // Json 응답을 위한 Map 또는 별도의 DTO 사용

        Map<String, Object> response = new HashMap();

        response.put("boardList" , boardList);
        response.put("startPage", startPage);
        response.put("endPage", endPage);

        return ResponseEntity.ok(response); // JSON 형태로 데이터를 반환
    }
}
