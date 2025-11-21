// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from 'react-router-dom';

// // Tailwind CSS 스타일 정의는 모두 제거했습니다.

// const BoardUpdate = () => {
//     // 1. URL에서 게시글 ID (id) 가져오기
//     const { id: boardId } = useParams();
//     const navigate = useNavigate();

//     // 2. 게시글 데이터 및 비밀번호 상태 관리
//     const [board, setBoard] = useState({
//         id: boardId,
//         boardTitle: '',
//         boardWriter: '',
//         boardContents: '',
//         boardPass: '', // 실제 비밀번호 (서버에서 가져옴)
//         inputPass: '' // 사용자가 입력한 비밀번호
//     });
//     const [loading, setLoading] = useState(true);

//     // 3. 초기 데이터 로드 (useEffect)
//     useEffect(() => {
//         const fetchBoard = async () => {
//             try {
//                 // React 역할: GET /api/board/{id} 호출하여 기존 데이터 가져오기
//                 const response = await axios.get(`http://localhost:8090/api/board/${boardId}`);
                
//                 setBoard(prev => ({
//                     ...prev,
//                     id: response.data.id, 
//                     boardTitle: response.data.boardTitle,
//                     boardWriter: response.data.boardWriter,
//                     boardContents: response.data.boardContents,
//                     boardPass: response.data.boardPass || '' // 비밀번호를 상태에 저장
//                 }));
//                 setLoading(false);
//             } catch (error) {
//                 console.error("게시글 로드 실패:", error);
//                 alert("게시글 정보를 불러오는 데 실패했습니다."); // alert 사용
//                 navigate('/board/paging');
//             }
//         };
//         if (boardId) {
//             fetchBoard();
//         }
//     }, [boardId, navigate]);

//     // 4. 입력 필드 변경 핸들러
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setBoard(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // 5. 게시글 수정 처리 함수 (POST/PUT 요청)
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // ** 비밀번호 검증 로직 **
//         // Thymeleaf/JS: if(pass == inputPass) else { alert("비밀번호가 일치하지 않습니다") }
//         if (board.boardPass !== board.inputPass) {
//             alert("비밀번호가 일치하지 않습니다"); // alert 사용
//             return;
//         }

//         if (!board.boardTitle || !board.boardContents) {
//             alert("제목과 내용을 모두 입력해주세요."); // alert 사용
//             return;
//         }

//         try {
//             // PUT /api/board/{id} 호출 (수정된 데이터를 JSON으로 전송)
//             await axios.put(`http://localhost:8090/api/board/${boardId}`, {
//                 id: board.id,
//                 boardTitle: board.boardTitle,
//                 boardContents: board.boardContents,
//                 boardWriter: board.boardWriter,
//                 boardPass: board.boardPass, 
//                 boardHits: board.boardHits || 0 
//             });

//             // 수정 성공 후 상세 페이지로 리다이렉트 (redirect:/board/{id} 역할)
//             alert("게시글이 성공적으로 수정되었습니다."); // alert 사용
//             navigate(`/board/${boardId}`); 

//         } catch (error) {
//             console.error("게시글 수정 실패:", error);
//             alert("게시글 수정 중 오류가 발생했습니다."); // alert 사용
//         }
//     };

//     if (loading) {
//         // 로딩 중일 때 메시지 출력
//         return <div>게시글 정보를 불러오는 중입니다...</div>;
//     }

//     return (
//         <div>
//             <h2>게시글 수정 페이지</h2>
            
//             {/* Thymeleaf: <form action ="/board/update" method = "post" name = "updateForm"> */}
//             {/* React: <form onSubmit={handleSubmit} 으로 API 호출 함수 연결 */}
//             <form onSubmit={handleSubmit}>

//                 {/* Writer: <input type="text" name="boardWriter" th:value="${boardUpdate.boardWriter}" readonly> */}
//                 <div>
//                     <label>작성자: </label>
//                     <input
//                         type="text"
//                         name="boardWriter"
//                         value={board.boardWriter}
//                         readOnly 
//                         style={{ backgroundColor: '#eee' }} // ReadOnly임을 간단히 표시
//                     />
//                 </div>
//                 <br />

//                 {/* Password: <input type="text" name="boardPass" id="boardPass"> */}
//                 <div>
//                     <label htmlFor="inputPass">비밀번호 확인: </label>
//                     <input
//                         type="password"
//                         id="inputPass"
//                         name="inputPass"
//                         value={board.inputPass}
//                         onChange={handleChange}
//                         placeholder="수정을 위해 비밀번호를 입력하세요"
//                         required
//                     />
//                 </div>
//                 <br />

//                 {/* Title: <input type="text" name="boardTitle" th:value = "${boardUpdate.boardTitle}"> <br/> */}
//                 <div>
//                     <label htmlFor="boardTitle">제목: </label>
//                     <input
//                         type="text"
//                         id="boardTitle"
//                         name="boardTitle"
//                         value={board.boardTitle}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <br />

//                 {/* Contents: <textarea name="boardContents" th:text="${boardUpdate.boardContents}"></textarea> */}
//                 <div>
//                     <label htmlFor="boardContents">내용: </label><br/>
//                     <textarea
//                         id="boardContents"
//                         name="boardContents"
//                         value={board.boardContents}
//                         onChange={handleChange}
//                         rows="10"
//                         cols="50"
//                         required
//                     ></textarea>
//                 </div>
//                 <br />

//                 {/* <input type="button" value="글 수정" onclick="boardUpdate()"> */}
//                 {/* React: type="submit"으로 변경하여 form 제출 시 handleSubmit 호출 */}
//                 <button type="submit">글 수정</button>

//                 <button
//                     type="button"
//                     onClick={() => navigate(`/board/${boardId}`)}
//                     style={{ marginLeft: '10px' }}
//                 >
//                     취소
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default BoardUpdate;




 <div>
            <h2>게시글 수정 페이지</h2>            
            <form onSubmit={handleSubmit}> 
                {/* 글쓴이 */}
                <div>
                    <label>작성자: </label>
                    <input
                        type="text"
                        name="boardWriter"
                        value={board.boardWriter}
                        readOnly
                        style={{backgroundColor: '#eee'}} />
                </div>
                <br />

                {/* 패스워드 */}
                <div>
                    <label htmlFor="inputPass">비밀번호 확인: </label>
                    <input 
                    type="password" 
                    id="inputPass" 
                    value={board.inputPass} 
                    onChange={handleChange} 
                    placeholder="수정을 위해 비밀번호를 입력하세요" 
                    required />
                </div>
                <br />

                {/* Title */}
                <div>
                    <label htmlFor="boardTitle">제목: </label>
                    <input 
                        type="text"
                        id="boardTitle"
                        name="boardTitle"
                        value={board.boardTitle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />

                {/* 내용 */}
              <div>
                    <label htmlFor="boardContents">내용: </label><br/>
                    <textarea
                        id="boardContents"
                        name="boardContents"
                        value={board.boardContents}
                        onChange={handleChange}
                        rows="10"
                        cols="50"
                        required
                    ></textarea>
                </div>
                <br />

                {/* <input type="button" value="글 수정" onclick="boardUpdate()"> */}
                {/* React: type="submit"으로 변경하여 form 제출 시 handleSubmit 호출 */}
                <button type="submit">글 수정</button>

                <button
                    type="button"
                    onClick={() => navigate(`/board/${boardId}`)}
                    style={{ marginLeft: '10px' }}
                >
                    취소
                </button>
            </form>
        </div>