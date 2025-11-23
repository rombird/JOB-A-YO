import axios from 'axios';
//axios 기본 설정(JWT(로그인 상태)가 필요한 모든 API요청 원활히 처리)

// 모든 API 요청의 기본 URL
const API_BASE_URL = 'http://localhost:8090';

// 공통 설정 적용한 axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: API_BASE_URL.replace(/\/+$/, ""), // URL 끝의 / 중복 제거
    withCredentials: true, // 쿠키 자동 포함
    timeout: 10000, // 10초 타임아웃

    headers: {
        "Content-Type": "application/json",
    },
});

/* 
   요청 인터셉터 (Request Interceptor)
   - FormData일 경우 Content-Type을 제거하여 axios가 자동 처리하도록 함
*/
apiClient.interceptors.request.use(
    (config) => {
        // FormData일 경우 Content-Type을 삭제하여 boundary 자동 처리
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/*
   응답 인터셉터 (Response Interceptor)
   - 응답 성공/실패 처리
*/
apiClient.interceptors.response.use(
    (response) => response, // 성공 시 그대로 반환

    (error) => {
        // 응답은 왔지만 HTTP 에러 상태인 경우
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 400:
                    console.error("잘못된 요청 (400):", error.response.data);
                    break;

                case 401:
                    console.error("인증 실패 (401): 토큰 만료 또는 로그인 필요");
                    // 자동 로그아웃 처리
                    window.location.href = "/user/login";
                    break;

                case 403:
                    console.error("권한 없음 (403): ADMIN 권한 필요");
                    break;

                case 404:
                    console.error("요청한 리소스를 찾을 수 없음 (404)");
                    break;

                case 500:
                    console.error("서버 내부 에러 (500)");
                    break;

                default:
                    console.error(`API Error ${status}:`, error.response.data);
            }
        }
        // 요청은 보냈지만 응답이 없는 경우 (네트워크, 서버 다운 등)
        else if (error.request) {
            if (error.code === "ECONNABORTED") {
                console.error("요청 시간 초과 (timeout)");
            } else {
                console.error("서버 응답 없음 또는 네트워크 오류:", error.message);
            }
        }
        // 요청 자체가 잘못된 경우
        else {
            console.error("요청 설정 오류:", error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
