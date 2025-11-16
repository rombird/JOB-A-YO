# JOB-A-YO_PJ
> 핵심 기능 : 사용자가 원하는 소비층, 사용할 수 있는 자금, 원하는 지역 등을 입력하면 그에 맞는 상권을 분석해서 결과를 예측 or 비슷한 다른 조건들을 추천해주는 시스템 → 고객 맞춤형 보고서 제공
>   
> 필수 기능 : 로그인·회원가입, 게시판글쓰기·글목록
> → 백엔드 작업으로 구현 (**11월 3일까지**) 

(서울시 상권분석 서비스 데이터)[https://data.seoul.go.kr/dataList/datasetList.do]

- 각자 이름으로 브랜치 만들어서 작업 - main : JOB-A-YO 그대로 이어 작업
- 진행상황은 개인 브랜치에서 readme 파일이 기록


```
Front/
├── css/
│   ├── ckEditorStyle.css  
│   ├── common.css
│   ├── join.css
│   ├── login.css
│   ├── main.css
│   └── writeBoard.css
├── font/
├── image/
├── js/
├── join.html
├── login.html
├── main.html
└── writeBoard.html
```

## 참고 사이트
- <a href="https://seahippocampus.tistory.com/category/%EA%B0%9C%EB%B0%9C/%EC%9B%B9%20%EA%B0%9C%EB%B0%9C">[웹개발관련]</a>  
- <a href="https://hnev.tistory.com/category/Spring%20Boot/%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EB%A7%8C%EB%93%A4%EA%B8%B0">[부트스트랩 게시판]</a>
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

## 필요한 데이터
- 인구 및 상권 데이터
- 상권 및 업종 데이터(폐업률, 창업률 등)  
- 지역별 카드 매출 데이터
- 지역별 소득 데이터  
- 지자체 도시계획, 재개발/재건축 구역 정보(? - 포함할 지 고민중)



