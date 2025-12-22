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
```

// 백엔드 추가한 작업
SecurityConfig : "/api/stores/count" permitAll()에 추가  
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
      
