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

<br />

<div align="center">
    <h2>주요 기능</h2>
    <div align="left">
        <p> - 핵심 기능 : 사용자가 원하는 소비층, 원하는 지역 등을 입력하면 그에 맞는 상권을 분석해서 결과를 예측 or 비슷한 다른 조건들을 추천해주는 시스템 → 고객 맞춤형 보고서 제공
        <p> - 필수 기능 : 회원/인증, 게시판/공지사항, AI 챗봇 chart.js</p>
    </div>
</div>

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
