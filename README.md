# dev 브랜치에서 확인가능합니다
- 각자 이름으로 브랜치 만들어서 작업
- 진행상황은 개인 브랜치에서 readme 파일이 기록
- 참고 <a href="https://dev-coco.tistory.com/111">포트폴리오</a>

<hr/>
<br/>

# JOB-A-YO_PJ 
## 프로젝트 소개
맞춤형 상권 프로젝트
<br/>
<br/>

## 프로젝트 정보(진행한 목적, 개발기간)
2025년 10월 1일 ~ 2025년 12월 5일
비수도권 지역의 경제활성화 방안으로 상권활성화 공략~!
<br/>
<br/>

## 배포 주소
http://localhost:8092(예시)
<br/>
<br/>

## 팀 소개(깃허브 주소, 맡은역할)

|이름|통합|페이지|
|-|-|-|
|이수현|데이터 분석 통합|**문의사항**관련|
|이인호|백엔드 통합|**게시글**관련|
|임새롬|프론트엔드 통합|**로그인, 회원가입**|
|together|데이터 분석|**핵심기능**데이터분석관련|

<br/>
<br/>

# 시작 가이드
## 요구사항(필요한 요구사항, 버전)  

Requirements  
Installation(code로)  
Backend(실행하는 법)  
Frontend(실행하는 법)  

<br/>
<br/>

# Stack
**Environment**  
<div>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=for-the-badge&logo=Sourcetree&logoColor=white"/>
</div>
<br/>

**Development**
<div>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"/>  
</div>

## 화면구성, API 주소
<br/>
<br/>

## 주요기능
> 핵심 기능 : 사용자가 원하는 소비층, 사용할 수 있는 자금, 원하는 지역 등을 입력하면 그에 맞는 상권을 분석해서 결과를 예측 or 비슷한 다른 조건들을 추천해주는 시스템 → 고객 맞춤형 보고서 제공
>   
> 필수 기능 : 로그인·회원가입, 게시판글쓰기·글목록, 셀레니움 사용해서(음식 종목 검색 순위 사용 ex. 양식 맛집, ...)
> → 백엔드 작업으로 구현
> 엔드포인트 기록

<br/>
<br/>

## 아키텍처
```
tree (cmd에서)
```

## 참고 사이트
- <a href="https://seahippocampus.tistory.com/category/%EA%B0%9C%EB%B0%9C/%EC%9B%B9%20%EA%B0%9C%EB%B0%9C">[웹개발관련]</a>  
- <a href="https://hnev.tistory.com/category/Spring%20Boot/%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EB%A7%8C%EB%93%A4%EA%B8%B0">[부트스트랩 게시판]</a>
- <a href="https://bigdata.sbiz.or.kr/#/" target="_blank">[소상공인365 사이트]</a>
- <a href="https://www.semas.or.kr/web/main/index.kmdc" target="_blank">[소상공인시장진흥공단 사이트]</a>  
- <a href="https://ols.semas.or.kr/ols/man/SMAN010M/page.do" target="_blank">[소상공인정책자금 사이트]</a>

## 필요한 데이터
- 인구 및 상권 데이터
- 상권 및 업종 데이터(폐업률, 창업률 등)  
- 지역별 카드 매출 데이터
- 지역별 소득 데이터  
- 지자체 도시계획, 재개발/재건축 구역 정보(? - 포함할 지 고민중)
