<<<<<<< HEAD
<div align="center">
    <h1>맞춤형 상권 프로젝트 『JOB-A-YO』 </h1>
</div>
<br/>
<div align="center">
    <h2>프로젝트 소개</h2>
    <p>비수도권 지역의 청년층, 중장년층을 위한 스마트한 상권 솔루션</p>
    <p>청년층에게는 비수도권지역에서 Job을 잡아 성장할 수 있는 기회 제공</p>
    <p>중장년층에게는 고향 및 비수도권 지역에서 제 2의 인생을 Job을 수 있도록 도음을 제공</p>
</div>
<br/>
<div align="center">
    <h2>팀원 소개</h2>
    <p>이미지를 누르시면 해당 팀원의 깃허브 페이지로 연결됩니다</p>
    <table>
      <thead>
        <tr align="center">
          <td>LEE SUHYEON</td>
          <td>LEE INHO</td>
          <td>LIM SAEROM</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="https://github.com/ddaeng2001" ><img width="200" height="200" src="https://github.com/user-attachments/assets/e29f43b8-5eda-4614-b757-2a65eb276443" /></a></td>
          <td><a href="https://github.com/inno-inho"><img width="200" height="200" src="https://github.com/user-attachments/assets/f9dfd917-89ad-41c0-a0d8-bc790789f90b" /></a></td>
          <td><a href="https://github.com/rombird" ><img width="200" height="200" src="https://github.com/user-attachments/assets/ff368d14-7c14-49cf-a164-d196c9e376dd" /></a></td>
        </tr>
        <tr align="center">
          <td>데이터분석 통합</td>
          <td>백엔드 통합</td>
          <td>프론트엔드 통합</td>
        </tr>
        <tr align="center">
          <td>각자 작업한 내용</td>
          <td>각자 작업한 내용</td>
          <td>각자 작업한 내용</td>
        </tr>
      </tbody>
    </table>
    
</div>
<br/>

<div align="center">
    <h2>기술 스택</h2>
    <div>
        <h3>Environment</h3>
          <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
          <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=for-the-badge&logo=Sourcetree&logoColor=white"/>
    </div>
    <div>
        <h3>Development</h3>
          <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
          <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
          <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
          <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
          <br/>
          <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
          <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
          <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
          <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
          <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    </div>
    <p>배포시 배포환경기술까지 추가로 넣어두기</p>
</div>
=======
<<<<<<< HEAD
## 백엔드 폴더 구조 (demo부분만 보시면 되요)
```
└─src
    ├─main
    │  ├─generated
    │  ├─java
    │  │  └─com
    │  │      └─example
    │  │          └─demo
    │  │              ├─apiController -> api로 통신할 Controller만 모아놓은곳
    │  │              ├─config
    │  │              │  └─auth
    │  │              ├─controller
    │  │              │  ├─UserRestController
    │  │              │  └─HomeController
    │  │              ├─domain
    │  │              │  ├─dto
    │  │              │  │  └─UserDto
    │  │              │  ├─entity
    │  │              │  │  ├─JwtToken
    │  │              │  │  ├─Signature
    │  │              │  │  └─User
    │  │              │  └─repository
    │  │              │  │  ├─JwtTokenRepository
    │  │              │  │  ├─SignatureRepository
    │  │              │  │  └─UserRepository
    │  │              └─service
    │  └─resources
    │      ├─static
    │      │  ├─css
    │      │  ├─font
    │      │  ├─image
    │      │  └─js
    │      └─templates
    │          ├─board
    │          └─user
    └─test
        └─java
            └─com
                └─example
                    └─demo
=======
기본 세팅(프로그램 연결하기위한)
1. redis, another redis 설치
2. application.properties에서 확인한 다음 폴더 생성해두기
   C:/springboot_img/CKEditor/
3. REACT에서 

```
// REACT
cd FRONT
npm install
npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
npm install recharts
npm install react-kakao-maps-sdk
npm start
>>>>>>> origin/임새롬
```
## 프론트엔드 폴더 구조
```
├─components
│  ├─board -> 게시판 관련
│  └─user -> 회원관련
└─css
```
<<<<<<< HEAD
=======

**백엔드 추가한 작업**   
SecurityConfig : "/api/stores/custom" permitAll()에 추가  
application.Properties에 코드 추가 : 
```
spring.jpa.show-sql=false
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=false  
```
resources : 24년_상권분석_데이터.csv  
apiController : apiCustomController.java  
domain → entity : Store.java  
       → dto : StoreRequest.java  
       → service : CsvImportService.java, StoreService.java  
api endpoint : /api/stores/custom  

**프론트 추가한 작업**  
asset 폴더 추가  
components → Home.jsx(수정), Header.jsx(수정), Search.jsx, Custom.jsx  
css → common.css(수정), home.css(수정), custom.css, search.css  
data 폴더 추가  
utils → mapUtils.js  
App.js(수정)  

<<<<<<< HEAD

## 필수 페이지
|페이지|상세|담당|
|-|-|-|
|메인|헤더, 푸터 포함|-|
|게시글목록|페이징처리|이수현|
|게시글작성|파일업로드기능, 업로드 완료시 메시지창|이인호|
|로그인|-|임새롬|
|회원가입|약관동의도 간략하게 만들건지?, DB연결|임새롬|
|데이터분석관련페이지는 추후에|-|-|
>>>>>>> origin/dev

<br />

<<<<<<< HEAD
<div align="center">
    <h2>주요 기능</h2>
    <div align="left">
        <p> - 핵심 기능 : 사용자가 원하는 소비층, 원하는 지역 등을 입력하면 그에 맞는 상권을 분석해서 결과를 예측 or 비슷한 다른 조건들을 추천해주는 시스템 → 고객 맞춤형 보고서 제공
        <p> - 필수 기능 : 회원/인증, 게시판/공지사항, AI 챗봇 chart.js</p>
    </div>
</div>
=======
>>>>>>> origin/dev

<br />

<div align="center">
    <h2>화면구성(UI)</h2>
    <p> gif로 핵심기능 찍으면 좋음 </p>
</div>

<br />

<div align="center">
    <h2> ERD </h2>
</div>

<br/>

<div align="center">
    <h2>API 문서</h2>
    <table>
        <caption>사용자(User API)</caption>
        <thead>
            <tr align="center">
              <th>메서드</th>
              <th>엔드포인트(URL)</th>
              <th>설명</th>
            </tr>
        </thead>
        <tbody>
            <tr>
              <td> POST </td>
              <td> /login</td>
              <td> 로그인</td>
            </tr>
            <tr>
              <td> POST </td>
              <td> /logout </td>
              <td>로그아웃 </td>
            </tr>
            <tr>
              <td>POST</td>
              <td> /join</td>
              <td>회원가입</td>
            </tr>
            <tr>
              <td>GET</td>
              <td> /validate </td>                
              <td> 토큰 검증 </td>
            </tr>
            <tr>
              <td> PUT </td>
              <td> /user </td>                
              <td> 내 정보 수정 </td>
            </tr>
            <tr>
              <td> DELETE </td>
              <td> /user </td>                
              <td> 회원 탈퇴 </td>
            </tr>
        </tbody>
    </table>
    <br/>
    <table>
        <caption>게시판(Board API)</caption>
        <thead>
            <tr>
                <th>메서드</th>
                <th>엔드포인트(URL)</th>
                <th>설명</th>
            </tr>
        </thead>
        <tbody>
            <tr>
              <td>GET</td>
              <td>/api/board/list</td>
              <td>게시글 목록 조회</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/board/{id}</td>
              <td>게시글 상세조회 </td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/board/save</td>
              <td>게시글 작성</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/api/board/{id}</td>
              <td>게시글 수정</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/api/board/delete/{id}</td>
              <td>게시글 삭제</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/board/file/{id}</td>
              <td>파일 다운로드</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/comment/save</td>
                <td>댓글작성</td> 
            </tr>
        </tbody>
    </table> 
    <br/>
    <table>
        <caption> 공지사항(Notice API) </caption>
        <thead>
            <tr>
                <th>메서드</th>
                <th>엔드포인트(URL)</th>
                <th>설명</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td> GET</td>
                <td> /api/notice/list</td>
                <td> 공지 목록</td>
            </tr>
            <tr>
                <td> GET </td>
                <td> /api/notice/{id} </td>
                <td> 공지 상세 조회 </td>
            </tr>
            <tr>
                <td> POST</td>
                <td> /api/notice/save</td>
                <td> 공지 작성</td>
            </tr>
            <tr>
                <td> PUT</td>
                <td> /api/notice/{id}</td>
                <td> 공지 수정</td>
            </tr>
            <tr>
                <td> DELETE</td>
                <td> /api/notice/delete/{id}</td>
                <td> 공지삭제</td>
            </tr>
        </tbody>
    </table>
    <br />
    <table>
        <caption> AI챗봇(Chat API) </caption>
        <thead> 
            <tr>
                <th> 메서드 </th> 
                <th> 엔드포인트(URL) </th> 
                <th> 설명 </th>
            </tr>
        </thead> 
        <tbody> 
            <tr>
                <td> POST </td>
                <td> /api/v1/simple-chat </td>
                <td> 질문하기 </td>
            </tr>
        </tbody>
    </table>
</div> 

<br />

<div align="center">
    <h2>프로젝트 구조</h2>
    <p>tree .</p>
</div>

<br/>

<div align="center">
    <h2>설치 및 실행방법</h2>
</div>

## 참고할 사이트
<a href="https://seahippocampus.tistory.com/category/%EA%B0%9C%EB%B0%9C/%EC%9B%B9%20%EA%B0%9C%EB%B0%9C">[웹개발관련]</a>  
<a href="https://seahippocampus.tistory.com/category/%EA%B0%9C%EB%B0%9C/%EC%9B%B9%20%EA%B0%9C%EB%B0%9C">[스프링부트, 리액트를 이용한 로그인(스프링 부트 기반 RestFul 서버 구축, 리액트 기반 JOB-A-YO_PJ
- 각자 이름으로 브랜치 만들어서 작업 - main JOB-A-YO 그대로 이어 작업하기!!  
- 진행상황은 개인 브랜치에서 readme 파일이 기록!!
```
git clone https://github.com/rombird/JOB-A-YO.git
cd front
npm install
npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
npm install recharts
npm start

cd back
idea . 
```

<<<<<<< HEAD
<br />
=======
- <a href="https://bigdata.sbiz.or.kr/#/" target="_blank">[소상공인365 사이트]</a>
- <a href="https://www.semas.or.kr/web/main/index.kmdc" target="_blank">[소상공인시장진흥공단 사이트]</a>  
- <a href="https://ols.semas.or.kr/ols/man/SMAN010M/page.do" target="_blank">[소상공인정책자금 사이트]</a>  

## 역할분담
|이름|통합 담당 분야|
|-|-|
|이수현|데이터 분석|
|이인호|백엔드 통합|
|임새롬|프론트엔드 통합|


## 필수 페이지
|페이지|상세|담당|
|-|-|-|
|메인|헤더, 푸터 포함|-|
|게시글목록|페이징처리|이수현|
|게시글작성|파일업로드기능, 업로드 완료시 메시지창|이인호|
|로그인|-|임새롬|
|회원가입|약관동의도 간략하게 만들건지?, DB연결|임새롬|
|데이터분석관련페이지는 추후에|-|-|


# apiBoardController
```
package com.example.demo.apiController;

import com.example.demo.domain.dto.BoardDetailResponse;
import com.example.demo.domain.dto.BoardDto;
import com.example.demo.domain.dto.BoardFileDto;
import com.example.demo.domain.dto.CommentDto;
import com.example.demo.service.BoardService;
import com.example.demo.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "apiBoardController", description = "게시판 REST API")
@RequestMapping("/api/board")
public class apiBoardController {

    private final BoardService boardService;
    private final CommentService commentService;

    // 파일 저장 경로
    @Value("${file.dir}")       // 파일 저장 경로
    private String fileDir;

    @Value("${CKEditor.image}")
    private String CKEditorImageDir;

// ################################################################
    // 게시판 목록 데이터 보내기
// ################################################################
//    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.5.7:3000"})
    @Operation(summary = "PagingList", description = "게시글 목록 및 페이징 정보")
    @GetMapping("/paging")
    public ResponseEntity<?> paging(
            @PageableDefault(page = 1, size = 10) Pageable pageable){     // @PageableDefault(page = 1) -> 기본적으로 1페이지 보여줄래
        log.info("GET  /api/board/paging... 페이징처리 apiBoardController");
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

        log.info("POST /api/board/writeBoard 게시글 작성 요청: {}", boardDto.getBoardTitle());

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
        log.info("GET /api/board/{id}... 게시글 단건 조회 apiBoardController");
        System.out.println("id:" + id);
        // 해당 게시글의 조회수를 하나 늘리고
        boardService.updateHits(id);

        // 게시글 데이터를 가져와서 detail.html에 출력
        BoardDto boardDto = boardService.findById(id);

        // 댓글 목록 조회
        List<CommentDto>commentDtoList = commentService.findAll(id);

        // 응답 Dto에 데이터 통합
        BoardDetailResponse response = new BoardDetailResponse(boardDto, commentDtoList);

        System.out.println("response:" + response + "...apiBoardController의 findById");

        // HTTP 200 ok 상태코드와 함께 Json데이터를 반환
        return ResponseEntity.ok(response);
    }

    // ################################################################
    // 첨부 파일 다운로드
    // ################################################################

    @Operation(summary = "fileDownload", description = "첨부파일 다운로드")
    @GetMapping("/download/{boardId}/{fileIndex}")
    public ResponseEntity<Resource> fileDownload(@PathVariable Long boardId,
                                                 @PathVariable int fileIndex){
        log.info("get /api/board/download/{boardId}/{fileIndex}... 첨부파일 다운로드, apiBoardController");

        try{
            // 1. 서비스에서 해당 파일 정보(Dto) 가져오기
            BoardFileDto boardFileDto = boardService.fileDownloadByIndex(boardId, fileIndex);

            String originalFilename = boardFileDto.getOriginalFilename();
            String storedFilename = boardFileDto.getStoredFilename();

            System.out.println("오리지널파일이름, 저장파일이름: " + originalFilename +  ", " + storedFilename);
            // 2. 파일 경로 생성
            if(originalFilename == null || storedFilename == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "DB에 파일 정보를 찾을 수 없습니다");
            }

            Path filePath = Paths.get(fileDir, storedFilename);
            Resource resource = new UrlResource(filePath.toUri());

            // 3. 실제 파일 존재 여부 확인
        if(!resource.exists() || !resource.isReadable()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

            // 파일 다운로드 시 파일이 깨지는 거 해결해준 ContentDisposition
        ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
            .filename(originalFilename, StandardCharsets.UTF_8)
                .build();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM) // 바이너리 데이터
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString())
                .body(resource);

        } catch (MalformedURLException e) {
            log.error("파일 경로 오류", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 경로가 잘못되었습니다");
        } catch(IllegalArgumentException e){
            log.error("파일 정보 조회 실패", e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Operation(summary = "boardDelete", description = "게시글 삭제")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        log.info("Delete /api/board/delete/{id} ... 게시글 삭제 요청, apiBoardController", id);

        // 서비스의 삭제 로직 호출
        boardService.delete(id);

        return ResponseEntity.ok("삭제 성공");
    }


    // CKEditor의 이미지 업로드 처리를 위한 API
    @PostMapping("/image/upload")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("upload") MultipartFile file){

        Map<String, Object> response = new HashMap<>();

        try{
            // 1. 파일 이름 생성 및 경로 설정
            String originalImageName = file.getOriginalFilename();

            // 2. 고유한 파일명 생성(CKEditor 이미지용)
            String storedImageName = UUID.randomUUID().toString() + "_" + originalImageName;

            // 3. 파일이 저장될 경로
            String CKEditorImageSavePath = CKEditorImageDir + storedImageName;

            // 4. 파일 시스템에 저장
            File saveFile = new File(CKEditorImageSavePath); // 🟢 변경된 변수 사용
            file.transferTo(saveFile);

            // 5. CKEditor에 반환할 응답 생성
            // accessUrl은 WebConfig의 정적 리소스 핸들러와 일치해야 함
            String accessUrl = "/images/" + storedImageName; //

            response.put("uploaded", 1);
            response.put("url", "http://localhost:8090" + accessUrl); // 클라이언트가 접근할 수 있는 전체 URL

        } catch (IOException e) {
            e.printStackTrace();
            response.put("uploaded", 0);
            response.put("error", Map.of("message", "파일 업로드 실패"));
        }
        return ResponseEntity.ok(response);
    }
>>>>>>> origin/dev

<div align="center">
  <h2> 개발 일정 & 회고 </h2>
    <p> 프로젝트 기간 : 2025.11.18 ~ 2025.12.12(4주) </p>
    <p> 회고에 추가할 내용 : API 통신 시 ERR_NETWORK 발생 <br/>
        문제: 리액트에서 백엔드로 점포 수 조회 요청 시 AxiosError: Network Error 발생. <br />
        원인: Spring Security 설정에서 새로운 엔드포인트(/api/stores/**)에 대한 접근 허용(permitAll)이 누락되어 요청이 차단됨. <br />
        해결: SecurityConfig 파일의 filterChain 설정에 해당 경로를 추가하여 권한 검사 없이 접근 가능하도록 수정 후 정상 작동 확인. <br />
    </p>
</div>

```mermaid
gantt
    title 🗓️ Project Development Timeline
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d

<<<<<<< HEAD
    section 기획 및 설계
    요구사항 정의 및 기능 명세      :done, des1, 2025-12-01, 2025-12-05
    DB 설계 및 ERD 작성           :done, des2, 2025-12-06, 2025-12-08
    
    section 백엔드(Spring Boot)
    회원/인증 API (JWT)          :done, be1, 2025-12-09, 2025-12-13
    게시판 & 공지사항 CRUD        :done, be2, 2025-12-14, 2025-12-18
    매출 통계 & AI 챗봇 API      :active, be3, 2025-12-19, 2025-12-23
    
    section 프론트엔드(React)
    UI 레이아웃 및 기본 컴포넌트    :done, fe1, 2025-12-09, 2025-12-15
    API 연동 및 상태 관리         :active, fe2, 2025-12-16, 2025-12-22
    
    section 핵심 기능(지도)
    카카오 지도 API 연동          :crit, map1, 2025-12-23, 2025-12-27
    지역 선택 및 데이터 저장 로직    :crit, map2, 2025-12-28, 2025-12-31
    
    section 마무리
    QA 및 버그 수정              : 2026-01-01, 2026-01-05
    README 작성 및 배포          : 2026-01-06, 2026-01-07
```
=======























    // ################################################################
    // 게시글 수정
    // ################################################################

    // Put api/board/{id}
    @Operation(summary = "게시글 수정 처리", description = "수정된 게시글 정보를 받아 DB에 반영하고, 수정된 DTO를 JSON으로 반환")
    @PutMapping("/{id}")
    public ResponseEntity<BoardDto> updateBoard(
            @PathVariable Long id,
            @RequestBody BoardDto boardDto,
            @RequestParam(value = "uploadFiles", required = false) List<MultipartFile> uploadFiles, // 2. 새 파일들
            @RequestParam(value = "deleteFileIds", required = false) List<Long> deleteFileIds   // 삭제할 파일들
    ){
        log.info("Put /api/board/{id}... 게시글 수정 apiBoardController", id);

        if(boardDto.getId() == null){
            boardDto.setId(id);
        }

//        // 경로 변수 id와 Dto의 id가 일치하도록 강제하거나 확인
//        if(boardDto.getId() == null || !boardDto.getId().equals(id)){
//            log.warn("ID 불일치: URL ID({})와 DTO ID({})", id, boardDto.getId());
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }

        try{
            // BoardService에 텍스트, 새 파일, 삭제할 ID 목록을 전달
            BoardDto updateBoard = boardService.update(boardDto, uploadFiles, deleteFileIds);

            log.info("게시글 수정 완료, ID: ()", updateBoard.getId());

            // 수정된 DTO와 200 OK상태 반환
            return new ResponseEntity<>(updateBoard, HttpStatus.OK);
        }catch (Exception e){
            log.error("게시글 수정 중 오류 발생: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }














//    @GetMapping("/update/{id}")
//    public String updateForm(@PathVariable Long id, Model model){
//        BoardDto boardDto = boardService.findById(id);
//        model.addAttribute("boardUpdate", boardDto);
//
//        return "board/update";
//    }
//
//    @Operation(summary = "boardUpdatePost", description = "게시글 수정 포스팅")
//    @PostMapping("/board/update")
//    public String update(@ModelAttribute BoardDto boardDto, Model model){
//        log.info("post/ board/update... 게시판 업데이트 포스팅");
//
//        BoardDto board = boardService.update(boardDto);
//        model.addAttribute("board", board);
//
//        System.out.println("contents = " + boardDto.getBoardContents());
//        return "redirect:/board/" + boardDto.getId(); // 게시글 상세페이지로 이동
//    }

}
```

# apiCommentController

```
package com.example.demo.apiController;

import com.example.demo.domain.dto.CommentDto;
import com.example.demo.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
@Slf4j
public class apiCommentController {
    private final CommentService commentService;

    // 댓글 저장
    @PostMapping("/save")
    public ResponseEntity<List<CommentDto>> save(@RequestBody CommentDto commentDto){
        log.info("post / api/comment/save.. 댓글 작성 요청: {}, apiCommentController", commentDto);

        Long saveResult = commentService.save(commentDto);

        if(saveResult != null){
            // 작성 성공 후, 갱신된 댓글 목록을 가져와서 리턴
            List<CommentDto> commentDtoList = commentService.findAll(commentDto.getBoardId());

            // HTTP 상태 코드 200 ok와 함꼐 댓글 목록 반환
            return new ResponseEntity<>(commentDtoList, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}

```



## 참고할 사이트
<a href="https://seahippocampus.tistory.com/category/%EA%B0%9C%EB%B0%9C/%EC%9B%B9%20%EA%B0%9C%EB%B0%9C">[웹개발관련]</a>  
<a href="https://www.youtube.com/watch?v=nMSFHreQdbU">[스프링부트, 리액트를 이용한 로그인(스프링 부트 기반 RestFul 서버 구축, 리액트 기반 JWT 저장, 자체/소셜(네이버,카카오) 로그인, RefreshToken과 AccessToken]</a>  
<a href="https://hnev.tistory.com/category/Spring%20Boot/%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EB%A7%8C%EB%93%A4%EA%B8%B0">[부트스트랩 게시판]</a>
>>>>>>> 이노
=======
*kakaompa안나오면 npm install 해주세요
      
>>>>>>> origin/임새롬
>>>>>>> origin/dev
