package com.example.demo.apiController;

import com.example.demo.domain.dto.BoardDetailResponse;
import com.example.demo.domain.dto.BoardDto;
import com.example.demo.domain.dto.CommentDto;
import com.example.demo.service.BoardService;
import com.example.demo.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

// ################################################################
    // 게시판 목록 데이터 보내기
// ################################################################
//    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.5.7:3000"})
    @Operation(summary = "PagingList", description = "게시글 목록 및 페이징 정보")
    @GetMapping("/paging")
    public ResponseEntity<?> paging(
            @PageableDefault(page = 1, size = 10) Pageable pageable){     // @PageableDefault(page = 1) -> 기본적으로 1페이지 보여줄래
        log.info("GET  /api/board/paging... 페이징처리 REST API");
        Page<BoardDto> boardList = boardService.paging(pageable);

        int blockLimit = 10;
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


    // 글 쓴거 포스팅
    @Operation(summary = "writeBoardPost", description = "글 쓴거 DB로 보냄")
    @PostMapping("/writeBoard") // /api/board 로 POST 요청
    public ResponseEntity<BoardDto> write(
            // 1. 폼 데이터 (제목, 글쓴이, 내용 등)를 DTO에 바인딩
            @ModelAttribute BoardDto boardDto,

            // 2. 파일 데이터를 "fileUpload" 키로 명시적으로 받음
            @RequestPart(value = "fileUpload", required = false) List<MultipartFile> fileUploads) throws IOException {

        log.info("POST /api/board 게시글 작성 요청: {}", boardDto.getBoardTitle());

        // 💡 3. 수신한 파일을 DTO의 필드에 수동으로 설정
        // DTO에 List<MultipartFile> fileUpload; 필드가 있으므로 사용 가능
        if (fileUploads != null && !fileUploads.isEmpty()) {
            boardDto.setFileUpload(fileUploads);
        }

        // 4. 서비스 호출 (Service 계층에서는 boardDto.getFileUpload()로 파일 접근)
        BoardDto savedBoard = boardService.save(boardDto);

        // 201 Created 응답과 함께 저장된 게시글 객체를 반환
        return new ResponseEntity<>(savedBoard, HttpStatus.CREATED);
    }





    // ################################################################
    // 게시글 조회
    // ################################################################

    @Operation(summary = "boardDetail", description = "게시글 단건 조회")
    @GetMapping("/{id}")
    public ResponseEntity<BoardDetailResponse> findById(@PathVariable Long id) {
        // 해당 게시글의 조회수를 하나 늘리고
        boardService.updateHits(id);

        // 게시글 데이터를 가져와서 detail.html에 출력
        BoardDto boardDto = boardService.findById(id);

        // 댓글 목록 조회
        List<CommentDto>commentDtoList = commentService.findAll(id);

        // 응답 Dto에 데이터 통합
        BoardDetailResponse response = new BoardDetailResponse(boardDto, commentDtoList);

        // HTTP 200 ok 상태코드와 함께 Json데이터를 반환
        return ResponseEntity.ok(response);

    }



}
