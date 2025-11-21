import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8090',
  withCredentials: true, // HTTP-Only 쿠키 포함
});
const REFRESH_URL = '/reissue'; // 백엔드 재발급 엔드포인트
//------------------------
// 요청 인터셉터 설정
//------------------------
api.interceptors.request.use(
  // async (config) => {
    (config) => {
    // 로그인 페이지나 회원가입 페이지 등 인증이 필요없는 경로는 제외
    const publicPaths = ['/login', '/join'];
    // 로그인/회원가입 요청은 그대로 통과
    if (publicPaths.some(path => config.url.includes(path))) {
      return config;
    }

    // 그 외 요청도  config 반드시 return
    return config;
  },
  (error) => {
    console.log("[오류-요청 인터셉터] ",error);
    window.location.href = '/login';
    return Promise.reject(error);
  }
);

//------------------------
// 응답 인터셉터 설정
//------------------------
api.interceptors.response.use(
  (response) => {
    console.log("[정상-응답 인터셉터] ",response);
    if (response.data?.auth === false) {
      window.location.href = '/login';
      return Promise.reject('세션이 만료되었습니다.');
    }
    return response;
  },
  async (error) => {
    console.log("[오류-응답 인터셉터] ",error);

    const origianlRequest = error.config;
    const status = error.response?.status;

    if (status == 401 && origianlRequest.url !== REFRESH_URL && !origianlRequest._retry){
      origianlRequest._retry = true; // 무한루프 방지

      try {
        // Access token 재발급 요청
        await api.post(REFRESH_URL, null);
        console.log("재발급 성공 Access Token 갱신 완료. 요청 재시도");

        return api(origianlRequest);
      }catch(refreshError){
        console.error("재발급 실패 Refresh Token도 만료됨. 로그인 필요.");

        if(window.location.pathname !== '/login'){
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    } 

    if (error.response?.data?.expired === true) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 