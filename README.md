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
    <h2>주요 기능</h2>
    <div align="left">
        <p> - 핵심 기능 : 사용자가 원하는 소비층, 원하는 지역 등을 입력하면 그에 맞는 상권을 분석해서 결과를 예측 or 비슷한 다른 조건들을 추천해주는 시스템 → 고객 맞춤형 보고서 제공
        <p> - 필수 기능 : 로그인·회원가입, 게시판글쓰기·글목록, chart.js</p>
    </div>
</div>

<div align="center">
    <h2>설치 및 실행방법</h2>
</div>

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

<br/>

<div align="center">
    <h2>프로젝트 구조</h2>
    <p>tree .</p>
</div>

<br/>

<div align="center">
    <h2>화면구성(UI)</h2>
</div>

<br/>

<div align="center">
    <h2>API 문서</h2>
    <table align="left">
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
              <td>GET</td>
              <td>/login</td>
              <td>로그인</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/join</td>
              <td>회원가입</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/mypage</td>
              <td>마이페이지</td>
            </tr>
        </tbody>
    </table>

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
        </tbody>
    </table>
</div>

<br />

<div align="center">
    <h2>개발 일정 Time Line</h2>
</div>

<div align="center">
    <h2>회고</h2>
</div>

