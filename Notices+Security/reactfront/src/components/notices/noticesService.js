import apiClient from "../../utils/apiClient";


// --- GET: 공지사항 목록 조회 (토큰 불필요, 공개 API) ---
export const fetchNotices = (params) => apiClient.get('/notices', { params });

// --- GET: 공지사항 상세 조회 (토큰 불필요, 조회수 증가) ---
export const fetchNotice = (id) => apiClient.get(`/notices/${id}`);

// --- POST: 공지사항 등록 (ADMIN 권한, 토큰 필요) ---
// JWT 쿠키는 apiClient의 withCredentials 설정으로 자동 처리
export const createNotice = (data) => apiClient.post('/notices', data);

// --- PUT: 공지사항 수정 (ADMIN 권한, 토큰 필요) ---
export const updateNotice = (id, data) => apiClient.put(`/notices/${id}`, data);

// --- DELETE: 공지사항 삭제 (ADMIN 권한, 토큰 필요) -
export const deleteNotice = (id) => apiClient.delete(`/notices/${id}`);
                                                        
export default apiClient;