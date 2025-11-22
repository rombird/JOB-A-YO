import apiClient from "../utils/apiClient";

// 공지사항 목록 조회(GET /api/notices, 공개 API)
export const fetchNotices = (params) => {
    //params : 검색, 페이지네이션 등 옵션 객체
    return apiClient.get("/notices", {params});
};

// 공지사항 상세 조회(GET /api/notices/{id}, 공개 API)
export const fetchNotice = (id) => apiClient.get(`/notices/${id}`);

// 공지사항 작성(POST /api/notices, ADMIN 권한, 파일 업로드 가능)
export const createNotice = (for)