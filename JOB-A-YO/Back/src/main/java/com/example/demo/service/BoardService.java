package com.example.demo.service;

import com.example.demo.domain.dto.BoardDto;
import com.example.demo.domain.entity.BoardEntity;
import com.example.demo.domain.entity.BoardFileEntity;
import com.example.demo.domain.repository.BoardFileRepository;
import com.example.demo.domain.repository.BoardRepository;
import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriUtils;

import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

// DTO -> Entity (Entity 클래스에서 할거임)
// Entity -> DTO(DTO클래스에서 할거임)

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardFileRepository boardFileRepository;

    @Value("${file.dir}")       // 파일 저장 경로
    private String fileDir;

    public void save(BoardDto boardDto) throws IOException {

        // TextArea에서 SQL로 넘어갈때 HTML태그도 같이 저장되는 걸 막기 위해서
        String cleanText = Jsoup.parse(boardDto.getBoardContents()).text();
        boardDto.setBoardContents(cleanText);

        // 파일 첨부 여부에 따라 로직 분리
        if(boardDto.getFileUpload().isEmpty()){
            // 첨부 파일 없음
            BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDto);
            boardRepository.save(boardEntity);     // boardRepository는 파라미터로 entity객체만 받음. 그래서 dto <-> entity 작업이 필요
        }else{
            // 첨부 파일 있음
            // 1. DTO에 담긴 파일 꺼냄
            // 2. 파일의 이름 가져옴
            // 3. 서버 저장용 이름을 만듬 // ex: 내사진.jpg ->  123123123_내사진.jpg
            // 4. 저장 경로 설정
            // 5. 해당 경로에 파일을 저장하는 처리
            // 6. board_table(SQL)에 해당 데이터 Save 처리
            // 7, board_file_table에 해당 데이터 save 처리

            BoardEntity boardEntity = BoardEntity.toSaveFileEntity(boardDto);   // 6. board_table(SQL)에 해당 데이터 Save 처리
            Long saveId = boardRepository.save(boardEntity).getId();
            BoardEntity board  = boardRepository.findById(saveId).get();
            for(MultipartFile boardFile: boardDto.getFileUpload()){
//                MultipartFile boardFile = boardDto.getFileUpload(); // 1. Dto에 담긴 파일 꺼냄
                String originalFilename = boardFile.getOriginalFilename(); // 2. 파일의 이름 가져옴
                String storedFileName = System.currentTimeMillis() + "_" + originalFilename; // 3. 서버저장용 이름 만듬
                String savePath = "c:/springboot_img/" + storedFileName; // 4. 저장 경로 설정
                boardFile.transferTo(new File(savePath));   // 5. 해당경로에 파일 저장

                // 7, board_file_table에 해당 데이터 save 처리
                BoardFileEntity boardFileEntity = BoardFileEntity.toBoardFileEntity(board, originalFilename, storedFileName);
                boardFileRepository.save(boardFileEntity);
            }
        }

    }

    @Transactional
    public List<BoardDto> findAll(){
        List<BoardEntity> boardEntityList = boardRepository.findAll();

        List<BoardDto> boardDtoList = new ArrayList<>();

        for(BoardEntity boardEntity: boardEntityList){
            boardDtoList.add(BoardDto.toBoardDto(boardEntity));
        }
        return boardDtoList;
    }

    // 조회수 올리기
    @Transactional
    public void updateHits(Long id){
        boardRepository.updateHits(id);
    }

    @Transactional
    // 게시글 클릭 시 DB에 있는 내용 보여주기
    public BoardDto findById(Long id){
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(id);
        if(optionalBoardEntity.isPresent()){
            BoardEntity boardEntity = optionalBoardEntity.get();
            BoardDto boardDto = BoardDto.toBoardDto(boardEntity);
            return boardDto;
        }else {
            return null;
        }
    }

    // DB에 수정된 Dto를 entity로 변환해서 넣어주기
    public BoardDto update(BoardDto boardDto){
        BoardEntity boardEntity = BoardEntity.toUpdateEntity(boardDto);

        boardRepository.save(boardEntity);

        return findById(boardDto.getId());
    }

    // 삭제 기능
    public void delete(Long id){
        boardRepository.deleteById(id);
    }

    // 페이징 기능
    @Transactional
    public Page<BoardDto> paging(Pageable pageable){
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 3;  // 한 페이지에 보여줄 글 개수

        // 한 페이지당 pageLimit만큼 글을 보여주고 정렬 기준은 id 기준으로 내림차순 정렬
        // boardEntities -> 스프링부트JPA에서 제공하는 듯
        // page 위치에 있는 값은 0부터 시작하니까 page변수 설정 시 -1 해놓음
        Page<BoardEntity> boardEntities =
                boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));
                                        // page -> 몇 페이지?, pageLimit -> 한 페이지에 몇 개?, Sort.By -> 정렬기준은?

        // 필요한 정보들
        System.out.println("boardEntities.getContent(): " + boardEntities.getContent());  // 요청 페이지에 해당하는 글들
        System.out.println("boardEntities.getTotalElements(): " + boardEntities.getTotalElements()); // 전체 글 갯수
        System.out.println("boardEntities.getNumber(): " + boardEntities.getNumber()); // DB로 요청한 페이지 번호
        System.out.println("boardEntities.getTotalPages(): " + boardEntities.getTotalPages()); // 전체 페이지 갯수
        System.out.println("boardEntities.getSize(): " + boardEntities.getSize()); // 한 페이지에 보여지는 글 갯수
        System.out.println("boardEntities.hasPrevious(): " + boardEntities.hasPrevious()); // 이전 페이지 존재 여부
        System.out.println("boardEntities.isFirst()" + boardEntities.isFirst()); // 첫 페이지 여부
        System.out.println("boardEntities.isLast()" + boardEntities.isLast());    // 마지막 페이지 여부

        // 목록에서 보일 것들 -> id, writer, title, hits, createdTime
        Page<BoardDto> boardDtos = boardEntities.map(board -> new BoardDto(board.getId(), board.getBoardWriter(), board.getBoardTitle(), board.getBoardHits(), board.getCreatedTime()));  // Page 객체에서 제공하는 map메서드 -> 안의 거를 하나씩 꺼내는 역할
        return boardDtos;

    }


    // 첨부파일 다운로드
    @Transactional
    public ResponseEntity<Resource> fileDownloadByIndex(Long boardId, int fileIndex){

        // 1. 게시글 ID로 파일 정보 조회 (BoardEntity는 여러 파일(BoardFileEntity)을 가질 수 있으므로 목록 조회)
//          Optional<BoardEntity> optionalBoard = boardRepository.findById(boardId)
        BoardDto boardDto = findById(boardId);
        if (boardDto == null || boardDto.getFileAttached() != 1 || boardDto.getStoredFilename().size() <= fileIndex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "요청된 파일 정보를 찾을 수 없거나 인덱스가 잘못되었습니다.");
        }
        // 인덱스를 사용하여 파일 이름 추출
        String storedFilename = boardDto.getStoredFilename().get(fileIndex);
        String originalFilename = boardDto.getOriginalFilename().get(fileIndex);

        Path filePath = Paths.get(fileDir, storedFilename);

        try{    // 파일을 Resource 객체로 감싸기
            Resource resource = new UrlResource(filePath.toUri());

            if(!resource.exists() || !resource.isReadable()){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "파일이 존재하지 않거나 읽을 수 없는 파일입니다");
            }

            // 3. HTTP 헤더 설정
            String encodedFileName = UriUtils.encode(originalFilename, StandardCharsets.UTF_8);
            String contentDisposition = "attachment; filename=\"" + encodedFileName + "\"";

            // 4. ResponseEntity 반환
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .body(resource);

        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }


    }


}
