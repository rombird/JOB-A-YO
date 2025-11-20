import axios from 'axios';

//axios 기본 설정 모아둔 파일
//공지사항 API, 로그인 API, 유저 정보 API 등이 모두 같은 방식으로 백엔드와 통신하도록 만들어줌

const API_BASE_URL = 'http://localhost:8090/api'; //모든 API 요청의 기본 URL

// 모든 파일에서 동일한 설정 가능해짐
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, //로그인 시 서버가 발급한 JWT 쿠키(accessToken...)를 axios 요청마다 알아서 포함시켜줌
    
    //요청 기본 헤더 : 백엔드에 JSON을 보낸다고 알려주는 설정
    headers: {
        'Content-Type' : 'application/json',
    },
});

//다른 서비스 파일에서 import해서 사용 가능
export default apiClient;