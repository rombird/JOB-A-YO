## 벤치마킹 사이트
- <a href="https://bigdata.sbiz.or.kr/#/" target="_blank">[소상공인365 사이트]</a>
- <a href="https://www.semas.or.kr/web/main/index.kmdc" target="_blank">[소상공인시장진흥공단 사이트]</a>  
- <a href="https://ols.semas.or.kr/ols/man/SMAN010M/page.do" target="_blank">[소상공인정책자금 사이트]</a>
- <a href="https://golmok.seoul.go.kr/main.do" target="_blank">[서울시 상권분석서비스]</a>

<hr/>

## BE 폴더 구조
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
```
## FE 폴더 구조
```
├─components
│  ├─board -> 게시판 관련
│  └─user -> 회원관련
└─css
```
