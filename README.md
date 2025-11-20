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
```
## 프론트엔드 폴더 구조
```
├─components
│  ├─board -> 게시판 관련
│  └─user -> 회원관련
└─css
```
