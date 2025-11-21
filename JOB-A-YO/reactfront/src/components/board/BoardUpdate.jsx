import axios from "axios";
import { useNavigate, Link, useParams} from 'react-router-dom';
import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "../../css/common.css";
import "../../css/writeBoard.css";
import "../../css/ckEditorStyle.css";


const BoardUpdate = () => {

    const {id: boardId} = useParams();
    const navigate = useNavigate();

    // 1. 상태 관리
    const [boardTitle, setBoardTitle] = useState("");
    const [boardWriter, setBoardWriter] = useState("");
    const [boardContents, setBoardContents] = useState("");
    const [inputPass, setInputPass] = useState("");
    const [serverPass, setServerPass] = useState("");
    const [boardHits, setBoardHits] = useState("0");
    const [loading, setLoading] = useState("true");

    // 첨부파일 관리를 위한 상태 분리
    const [existingFiles, setExistingFiles] = useState([]);     // 서버에 이미 있는 파일들
    const [newFiles, setNewFiles] = useState([]);   // 새로 추가할 파일들
    const [deleteFileIds, setDeleteFileIds] = useState([]);
   
    const uploadAreaRef = useRef(null);
    const fileInputRef = useRef(null);

    // 2. 페이지 입장시 초기 데이터 로드
    useEffect (() => {
        const fetchBoard = async () => {

            try{
            const response = await axios.get(`http://localhost:8090/api/board/${boardId}`);
            const data = response.data
        
            setBoardTitle(data.boardTitle);
            setBoardWriter(data.boardWriter);
            setBoardContents(data.boardContents);
            setServerPass(data.boardPass || "");
            setBoardHits(data.boardHits || 0);
            
            // 기존 첨부파일 목록 가져오기
            if(data.fileUpload){
                setExistingFiles(data.fileUpload)
            }
            
            setLoading(false);
            }catch (error){
                console.error("게시글 정보 로드 실패: ", error);
                alert("게시글 정보를 불러오는데 실패했습니다");
                
                // 테스트용 더미 데이터
                setBoardTitle("테스트 게시글");
                setBoardWriter("홍길동");
                setBoardContents("내용");
                setServerPass("1234");
                // 테스트용 기존 파일 더미
                setExistingFiles([
                    { id: 1, originalFileName: "existing_image.png", storedFileName: "uuid_img.png", size: 10240 },
                    { id: 2, originalFileName: "old_report.pdf", storedFileName: "uuid_pdf.pdf", size: 20480 }
                ]);
                
                navigate('/board/Paging');
                setLoading(false);
            }
        };

        // boardId가 있을때만 실행
        if(boardId){
            fetchBoard();
        }else{
            setLoading(false);   // Id가 없으면 로딩 해제(테스트용)
        }
    }, [boardId, navigate]);

    // 3. 파일 처리 로직
    const formatBytes = (bytes) => {

        if(bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes/ Math.pow(k, i).toFixed(1)) + ' ' + sizes[i]);
    }

    const allowedExtensions = ['xlsx', 'pptx', 'txt', 'pdf', 'jpg', 'jpeg', 'png', 'hwp'];
    const maxCount = 5;
    const maxSize = 20 * 1024 * 1024;

    // 4. 새 파일 추가 핸들러
    const handleFiles = useCallback((files) => {
        const incomingFiles = Array.from(files);
        let validFiles = [];

        for(const file of incomingFiles){
            const ext = file.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(ext)){
                alert(`${file.name}은 지원하지 않는 형식의 파일입니다.`);
                continue;
            }
            
            // 개수 제한 체크 (기존 파일 - 삭제 예정 파일) + (현재 대기중인 새 파일) + (추가될 파일)
            const currentCount = existingFiles.length + newFiles.length + validFiles.length;
            if (currentCount.length > maxCount){
                alert("최대 5개까지 업로드 할 수 있습니다.");
                break;
            }

            // 파일 사이즈 체크 
            if(file.size > maxSize){
                alert(`${file.name}은 20MB 초과합니다.`);
                continue;
            }

            // 중복 체크
            const isDuplicateNew = newFiles.some(f => f.name === file.name) || validFiles.some(f => f.name === file.name);
            const isDuplicateOld = existingFiles.some(f => f.originalFileName === file.name);

            if(isDuplicateNew || isDuplicateOld){
                alert(`${file.name}은 이미 목록에 있습니다`);
                continue;
            }
            validFiles.push(file);

        }
        if(validFiles.length > 0){
            setNewFiles(prev => [...prev, ...validFiles]);
        }

        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }, [existingFiles, newFiles]);

    const onFileInputChange = (e) => {
        handleFiles(e.target.files);
    };

    // 파일 삭제 핸들러(기존 파일과 새 파일 구분)
    const deleteFile = (type, identifier) => {
        if(type === 'existing'){
            // 기존 파일 삭제 -> 화면에서 제거 후 deleteFileIds에 Id 추가
            const fileToDelete = existingFiles.find(f => f.id === identifier);
            if(fileToDelete){
                setExistingFiles(prev => prev.filter(f => f.id !== identifier));
                setDeleteFileIds(prev => [...prev, identifier]); // Id 저장
            }
        }else{
            // 새 파일 삭제 -> 그냥 배열에서 제거 
            setNewFiles(prev => prev.filter((_, index) => index !== identifier));
        }
    };

    // 드래그 앤 드롭
    useEffect(() => {
        const uploadArea = uploadAreaRef.current;
        if(!uploadArea) return;

        const handleDragOver = (e) => {
            e.preventDefault();
            uploadArea.classList.add("dragover");
        }
        const handleDragLeave = (e) => {
            uploadArea.classList.remove("dragover");
        }
        const handleDrop = (e) => {
            e.preventDefault();
            uploadArea.classList.remove("dragover");
            handleFiles(e.dataTransfer.files);
        }

        uploadArea.addEventListener("dragover", handleDragOver);
        uploadArea.addEventListener("dragleave", handleDragLeave);
        uploadArea.addEventListener("drop", handleDrop);

        return () => {
            uploadArea.removeEventListener("dragover", handleDragOver);
            uploadArea.removeEventListener("dragleave", handleDragLeave);
            uploadArea.removeEventListener("drop", handleDrop);
        }
    }, [handleFiles]);

    // 4. 수정 제출 핸들러
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!boardTitle || !boardWriter || !inputPass || !boardContents){
            alert("제목, 비밀번호, 내용을 모두 입력해 주세요.");
            return;
        }

        if(inputPass !== serverPass){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // FormData 객체 생성
        const formData = new FormData();

        // 1. 게시글 정보 (text)
        formData.append("id", boardId);
        formData.append("boardTitle", boardTitle);
        formData.append("boardWriter", boardWriter);
        formData.append("boardPass", serverPass);
        formData.append("boardContents", boardContents);
        formData.append("boardHits", boardHits);

        // 2. 삭제할 파일 Id들
        // 백엔드에서 @RequestParam(value="deleteFileIds", required=false) List<Long> deleteFileIds 로 받음
        deleteFileIds.forEach(id => {
            formData.append("deleteFileIds", id);
        });

        // 3. 새로 추가할 파일들
        // 백엔드에서 @RequestParam("uploadFiles") List<MultipartFile> uploadFiles 로 받음
        newFiles.forEach(file => {
            formData.append("uploadFiles", file);
        });

        // PUT 메서드로 FormData 전송
        try{
            await axios.put(`http://localhost:8090/api/board/${boardId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("게시글이 성공적으로 수정되었습니다");
            navigate(`/board/BoardDetail/${boardId}`);
        }catch(error){
            console.error("게시글 수정 실패: ", error);
            alert("게시글 수정 중 오류가 발생했습니다.");
        }
    };

    const allFiles = [
        ...existingFiles.map(f => ({
            ...f,
            origin: "existing",
            name: f.originalFileName,   // 이름 통일
            size: f.size
        })),
        ...newFiles.map(f => ({
            fileObj: f,  // 원본 파일 객체(삭제용)
            origin: "new",
            name: f.name,
            size: f.size
        }))
    ]


    if (loading) return <div>데이터 로딩 중...</div>;



    return (
        <>


            <div className="custom">
                <header className="header">
                    <div className="topHeader">
                        <div className="topList layoutCenter">
                            <ul className="topNav">
                                <li className="topNavli">
                                    <Link to="user/Login"><img className="imgLogin" src="@{/image/person.svg}" alt="" />로그인</Link>
                                </li>
                                <li className="topNavli">
                                    <Link to="user/Join">회원가입</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="navHeader">
                        {/* <!-- layoutCenter를 줄지 말지 풀드롭다운에 영향 미칠지 확인 --> */}
                        <div className="detailnav layoutCenter">
                            <h1><a href="/main">LOGO</a></h1>
                            <div className="wrap">
                                <ul className="mainNav">
                                    <li className="mainList">
                                        <div className="listLine">
                                            <a className="mainMenu" href="#">빅데이터 상권 분석</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="#">맞춤형정보</a>
                                            </li>
                                            <li className="subList">
                                                <a href="#">맞춤형정보2</a>
                                            </li>
                                            <li className="subList">
                                                <a href="#">상권정보3</a>
                                            </li>
                                        </ul>

                                    </li>
                                    <li className="mainList">
                                        <div className="listLine">
                                            <a className="mainMenu" href="#">상권시장 TREND</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="#">Trend NOW</a>
                                            </li>
                                            <li className="subList">
                                                <a href="#">NEWS</a>
                                            </li>
                                            <li className="subList">
                                                <a href="#">Trend 3</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="mainList">
                                        <div className="listLine">
                                            <a className="mainMenu" href="#">소상공인 대시보드</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="#">내 가게 경영진단</a>
                                            </li>
                                            <li className="subList">
                                                <a href="#">커뮤니티</a>
                                            </li>
                                            <li className="subList">
                                                <a href="#"></a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="mainList">
                                        <div className="listLine">
                                            <a className="mainMenu" href="#">이용안내</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="#">공지사항</a>
                                            </li>
                                            <li className="subList">
                                                <a href="#">문의사항</a>
                                            </li>
                                            <li className="subList">
                                                <Link to="/user/Paging">커뮤니티</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>


                {/* <!-- 게시글 작성 공간 --> */}
                <main>
                    <div className="layoutCenter">

                        {/* <!-- 문의사항 ?, 별 아이콘 ..... --> */}
                        <div className="sub-title">
                            {/* <!-- 문의사항, 아이콘 --> */}
                            <div className="inquiry">
                                <h3>문의사항</h3>
                                <div className="question-mark-container">
                                    <div className="question-mark"><i className="fa-solid fa-question fa-lg"></i></div>
                                    <div className="question-mark-hidden">문의사항</div>
                                </div>
                                <div className="question-mark-container">
                                    <div className="question-mark"><i className="fa-solid fa-star fa-lg"></i></div>
                                    <div className="question-mark-hidden">즐겨찾기 추가</div>
                                </div>
                            </div>

                            {/* <!-- 경로 --> */}
                            <div className="path">
                                <div><i className="fa-solid fa-house"></i></div>
                                <div>이용안내</div>
                                <div><i className="fa-solid fa-chevron-right"></i></div>
                                <div>문의사항</div>
                                <div><i className="fa-solid fa-chevron-right"></i></div>
                                <a className="inquiry-right-side" href="/board/paging">커뮤니티</a>
                            </div>
                        </div>

                        {/* <!-- 글 적는곳 --> */}
                        <div className="write-space">
                            <form onSubmit={handleUpdate}>

                                {/* <!-- 제목 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>제목</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardTitle" />
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>

                                {/* <!-- 글쓴이 부분, 수정 불가 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>글쓴이</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardWriter" value={boardWriter} readOnly />
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>

                                {/* <!-- 비밀번호 확인 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>비밀번호</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="inputPass" value={inputPass} onChange={(e) => setInputPass(e.target.value)} placeholder="비밀번호를 입력하세요" />
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>


                                {/* <!-- 내용 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area content-label">
                                        <div>내용</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area content-area">
                                        <div className="main-container">
                                            <div className="editor-container editor-container_classic-editor" id="editor-container">
                                                <div className="editor-container__editor">
                                                    {/* <textarea className="editor" name="boardContents" id="editor"></textarea> */}
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={boardContents}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setBoardContents(data);
                                                        }}
                                                    /> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>

                                {/* <!-- 첨부파일 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>첨부파일</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <div className="file-upload-info">
                                            <div className="file-upload-info-left">
                                                <div>용량 제한 : {formatBytes(maxSize)}, 개수제한 : {maxCount}개</div>
                                                <div>파일 형식 : {allowedExtensions.join(', ')}</div>
                                            </div>
                                            <input
                                                className="file-upload-btn"
                                                type="file"
                                                id="fileUpload"
                                                name="fileUpload"
                                                multiple
                                                ref={fileInputRef}  // useRef 연결
                                                onChange={onFileInputChange} />
                                            <label className="upload-btn" htmlFor="fileUpload">
                                                <i className="fa-solid fa-upload"></i>
                                            </label>
                                        </div>

                                        {/* 파일 업로드 영역 및 미리보기 */}
                                        <div className="upload" id="upload" ref={uploadAreaRef}>
                                            {/* 조건부 렌더링 */}
                                            {allFiles.length === 0 ? (
                                                <p>파일을 드래그하여 첨부할 수 있습니다</p>
                                            ) : (
                                                <div className="preview-container">

                                                    {allFiles.map((file, index) => (
                                                        // key는 React가 목록 요소를 식별하는 데 도움을 줍니다.
                                                        <React.Fragment key={file.name + file.size}>
                                                            {/* 첫 번째 요소가 아닐 경우에만 점선 추가 */}
                                                            {index > 0 && (
                                                                <div className="line-dotted-preview"></div>
                                                            )}

                                                            <div className="preview-box">
                                                                <div>
                                                                    <div className="file-name">{file.name}</div>
                                                                    <div className="file-size">{formatBytes(file.size)}</div>
                                                                </div>
                                                                <button
                                                                    className="delete-btn"
                                                                    type="button"
                                                                    onClick={() => deleteFile(file.name, file.size)}
                                                                >
                                                                    <i className="fa-solid fa-trash fa-lg"></i>
                                                                </button>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* */}
                                <div className="under-line-dotted line-dotted"></div>

                                {/* */}
                                <div className="submit-btn-group">
                                    <button style={{ borderColor: '#3A6B71', color: '#335f64' }} type="submit" className="btn btn-outline-success btn-lg">수정</button>

                                    <button style={{ borderColor: '#3A6B71', color: '#335f64' }} type="button" className="btn btn-outline-success btn-lg">
                                        <Link to="/board/paging" style={{ textDecoration: 'none', color: 'inherit' }}>목록</Link>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </main>


                <footer className="">
                    <div className="mainFooter layoutCenter">
                        <div className="footerLogo">
                            <h1>LOGO</h1>
                        </div>
                        <div className="footerInfo">
                            <div className="footerInfoL">
                                <p>대구광역시 중구 중앙대로 366</p>
                                <p>임과 함께</p>
                                <p>admin@gmail.com</p>
                                <p>053-123-4567</p>
                            </div>
                            <div className="footerInfoR">
                                <ul className="site">
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">사이트맵</a></li>
                                </ul>
                                <ul className="related">
                                    <li><a href="#">관련기관정보</a></li>
                                </ul>
                                <ul className="personInfo">
                                    <li><a href="#">개인정보처리방침</a></li>
                                    <li><a href="#">이용약관</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )

}

export default BoardUpdate;







// import axios from "axios";
// import {useState, useEffect} from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const BoardUpdate = () => {
//     // 1. URL에서 게시글 ID(id) 가져오기

//     const {id : boardId} = useParams();     // id는 boardId라는 이름
//     const navigate = useNavigate();

//     // 2. 게시글 데이터 및 비밀번호 상태 관리
//     const [board, setBoard] = useState({
//         id: boardId,
//         boardTitle: '',
//         boardWriter: '',
//         boardContents: '',
//         boardPass: '',  // 맨 처음 글 작성할 시 설정하는 게시글 비밀번호
//         inputPass: '',  // 수정시 사용자가 누를 비밀번호
//     });
//     const [loading, setLoading] = useState(true);   //  기본 로딩값 true

//     // 3. 초기 데이터 로드
//     useEffect(() => {
//         const fetchBoard = async () => {
//             try{
//                 // Get /api/board/{id} 호출해서 기존 데이터 가져오기
//                 const response = await axios.get(`http://localhost:8090/api/board/${boardId}`);

//                 console.log("정보 확인:", response);

//                 setBoard(prev => ({
//                     ... prev,
//                     id: response.data.id,
//                     boardTitle: response.data.boardTitle,
//                     boardWriter: response.data.boardWriter,
//                     boardContents: response.data.boardContents,
//                     boardPass: response.data.boardPass,
//                 }));
//                 setLoading(false);
//             }catch(error){
//                 console.error("게시글 로드 실패: ", error);
//                 alert("게시글 정보를 불러오는데 실패했습니다.");
//                 navigate("/board/Paging");
//             }
//         };
//         if(boardId){
//             fetchBoard();
//         }
//     }, [boardId, navigate]);

//     // 4. 입력 필드 변경 핸들러
//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setBoard(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // 5. 게시글 수정 처리 함수(PUT 요청)
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // 비밀번호 검증 
//         if(board.boardPass !== board.inputPass){    // 원래 비밀번호와 입력받은 비밀번호가 !== 하다면
//             alert("비밀번호가 일치하지 않습니다"); 
//             return;
//         }

//         if(!board.boardTitle || !board.boardContents){
//             // 제목과 내용이 입려되어 있지않다면
//             alert("제목과 내용을 모두 입력해주세요.");
//             return;
//         }   

//         try{
//             // PUT /api/board/{id} 호출 (수정된 데이터를 JSON으로 전송)
//             await axios.put(`http://localhost:8090/api/board/${boardId}`, {
//                 id: board.id,
//                 boardTitle: board.boardTitle,
//                 boardContents: board.boardContents,
//                 boardWriter: board.boardWriter,
//                 boardPass: board.boardPass,
//                 boardHits: board.boardHits || 0
//             });

//             // 수정 성공 후 상세 페이지로 리다이렉트
//             alert("게시글이 성공적으로 수정되었습니다.") // alert 사용
//             navigate(`/board/${boardId}`);        
//         }catch(error){
//             console.error("게시글 수정 실패: ", error);
//             alert("게시글 수정 중 오류가 발생했습니다");
//         }
//     };

//     if (loading){
//         // 로딩 중일 때 메시지
//         return <div>게시글 정보를 불러오는 중입니다...</div>
//     }

//     return(

    


        
//         <div>
//             <h2>게시글 수정 페이지</h2>            
//             <form onSubmit={handleSubmit}> 
//                 {/* 글쓴이 */}
//                 <div>
//                     <label>작성자: </label>
//                     <input
//                         type="text"
//                         name="boardWriter"
//                         value={board.boardWriter}
//                         readOnly
//                         style={{backgroundColor: '#eee'}} />
//                 </div>
//                 <br />

//                 {/* 패스워드 */}
//                 <div>
//                     <label htmlFor="inputPass">비밀번호 확인: </label>
//                     <input 
//                     type="password" 
//                     id="inputPass" 
//                     value={board.inputPass} 
//                     onChange={handleChange} 
//                     placeholder="수정을 위해 비밀번호를 입력하세요" 
//                     required />
//                 </div>
//                 <br />

//                 {/* Title */}
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

//                 {/* 내용 */}
//               <div>
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
//                     onClick={() => navigate(`/board/${boardId}`)}       // 상세페이지로 가세요
//                     style={{ marginLeft: '10px' }}
//                 >
//                     취소
//                 </button>
//             </form>
//         </div>
//     );
// };


// export default BoardUpdate;












