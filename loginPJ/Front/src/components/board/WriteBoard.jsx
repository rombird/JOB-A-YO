import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig'; 
import "../../css/login.css";
import "../../css/writeBoard.css";

// 게시글 등록, 수정 모두 가능
const WriteBoard = () => {
    const { id } = useParams(); // 글쓰기 수정 작업
    const navigate = useNavigate();

    // 게시글 등록 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작(새로고침)을 막습니다.
        // 폼 데이터를 가져옵니다 (파일 포함)
        const form = e.target;
        const formData = new FormData(form);

        try {
            // 백엔드 API로 데이터 전송
            // 파일 업로드 시에는 Content-Type을 multipart/form-data로 설정
            const response = await api.post('/api/board/writeBoard', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert("게시글이 작성되었습니다.");
                navigate('/api/board/paging');  // 게시글 목록 페이지로 이동
            }
        } catch (error) {
            console.error("글 작성 실패:", error);
            alert("글 작성 중 오류가 발생했습니다.");
        }
    };
    
 
    return (
        <>
            <div className="write layoutCenter">
                <div className="sub-title">
                    <div className="inquiry">
                        <h3>커뮤니티 글쓰기</h3>
                        <img src="../images/writing.png" alt="게시글 작성" />
                    </div>
                    <div className="path">
                        <div>이용안내 &gt; Community </div>
                    </div>
                </div>

                {/* <!-- 글 적는곳 --> */}
                <div className="write-space">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
                        <div className="label-and-writeArea">
                            <div className="label-area">
                                <div>제목</div>
                            </div>
                            <div className="write-area">
                                <input className="write-input" type="text" name="boardTitle" placeholder="제목"/>
                            </div>
                        </div>

                        {/* <!-- 점선 --> */}
                        <div className="line-dotted"></div>

                        {/* <!-- 첨부파일 --> */}
                        <div className="label-and-writeArea">
                            <div className="label-area">
                                <div>첨부파일</div>
                                <div><i style={{color: '#3A6B71'}} class="fa-solid fa-star-of-life fa-2xs"></i></div>
                            </div>
                            <div className="write-area">
                                <div className="file-upload-info">
                                    <div className="file-upload-info-left">
                                        <div>용량 제한 : 6.0MB, 객수 제한 : 5개</div>
                                        <div>파일 형식 : xlsx, pptx, txt, pdf, jpg, jpeg, png, hwp</div>
                                    </div>
                                    <input className="file-upload-btn" type="file" id="fileUpload" name="fileUpload" multiple/>
                                    <label className="upload-btn" for="fileUpload">
                                        <img src="../images/upload.png" alt="파일업로드" />
                                    </label>
                                </div>
                                <div className="upload" id="upload">
                                    <p>파일을 드래그하여 첨부할 수 있습니다</p>
                                </div>
                            </div>
                        </div>    

                        <div className="line-dotted"></div>

                        <div className="label-and-writeArea">
                            <div className="label-area content-label">
                                <div>내용</div>
                            </div>
                            <div className="write-area content-area">
                                <div className="main-container">
                                    <div className="editor-container editor-container_classic-editor" id="editor-container">
                                        <div className="editor-container__editor">
                                            <textarea className="editor" name="boardContents" id="editor" placeholder="나의 소식을 공유해보세요!" ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="under-line-dotted line-dotted"></div>
                    </form>
                    {/* <!-- 제출 버튼 있는 줄 --> */}
                    <div className="submit-box layoutCenter">
                        <button className="submit-btn" type="submit" >등록</button>
                    </div>
                </div>
            </div>
            

        </>

    )

}

export default WriteBoard;


