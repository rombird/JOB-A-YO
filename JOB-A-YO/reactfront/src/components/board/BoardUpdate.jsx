import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "../../css/common.css";
import "../../css/writeBoard.css";
import "../../css/ckEditorStyle.css";


class MyUploadAdapter{
    constructor(loader){
        // 파일 정보 로더
        this.loader = loader;
        // 서버의 이미지 업로드 API 엔드포인트
        this.url = 'http://localhost:8090/api/board/image/upload';
    }

    // 파일 전송 메서드
    upload(){
        return this.loader.file
                .then(file => {
                    const data = new FormData();
                    // 서버 컨트롤러에서 받는 파라미터 이름이 upload(RequestParam)로 일치하여야함
                data.append('upload', file);

                return axios.post(this.url, data, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                .then(res => {
                    // 서버 응답: {uploaded: 1, url: "http://localhost:8090/images/..."}
                    // CKEditor 형식에 맞게 변환하여 반환
                    if (res.data.uploaded){     // uploaded는 CKEditor가 요구하는 Header에 맞춘거
                        return{
                            default: res.data.url
                        };
                    }else{
                        throw new Error('Image upload failed');
                    }
                })
                .catch(error => {
                    console.error("CKEditor 이미지 업로드 에러:", error);
                });
            });
    }
    // 어댑터가 취소될 때 호출 (필수)
    abort(){
        // 업로드 취소 로직
    }
}

// 커스텀 업로드 어댑터를 CKEditor 플러그인으로 등록하는 함수
function MyCustomUploadAdapterPlugin(editor){
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}



const BoardUpdate = () => {

    const navigate = useNavigate();
    const {boardId} = useParams();  // URL에서 게시글 ID 가져오기

    // 텍스트 영역 상태관리
    const [boardContents, setBoardContents] = useState("");
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");   
    const [password, setPassword] = useState("");

    // 파일 관련 상태
    const [uploadedFiles, setUploadedFiles] = useState([]); // 새로 추가할 파일(File 객체)
    // 기존 파일 목록
    const [existingFiles, setExistingFiles] = useState([]);
    // 서버에 삭제 요청할 기존 파일 ID 목록
    const [filesToDeleteIds, setFilesToDeleteIds] = useState([]);

    // DOM 요소 참조
    const uploadAreaRef = useRef(null);
    const fileInputRef = useRef(null);

    // 파일 처리 로직
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    // 파일 유효성 검사 및 추가하는 함수
    const allowedExtensions = ['xlsx', 'pptx', 'txt', 'pdf', 'jpg', 'jpeg', 'png', 'hwp'];
    const maxCount = 5;
    const maxSize = 20 * 1024 * 1024; // 6MB

    // CKEditor 설정 객체 정의
    const editorConfig = {
        image: {
            upload: {
                types: ['png', 'jpeg', 'gif', 'bmp', 'webp'],
                withCredentials: true,
            }
        },
        // 1. 커스텀 업로드 어댑터 플러그인 등록
        extraPlugins: [MyCustomUploadAdapterPlugin],

        // 2. 툴바 버튼 설정(imageUploade 버튼 포함)
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertImage', 'mediaEmbed', 'undo', 'redo' ]
    };



    // 파일 유효성 검사 및 추가하는 함수
    const handleFiles = useCallback((files) => {
        const newFiles = Array.from(files);
        let validFiles = [];

        for (const file of newFiles) {
            const ext = file.name.split('.').pop().toLowerCase();

            // 1. 확장자 검사
            if (!allowedExtensions.includes(ext)) {
                alert(`${file.name}: 지원하지 않는 형식입니다.`);
                continue;
            }

            // 2. 파일 개수 제한 검사 (현재 파일 개수 + 추가할 파일 개수)
            if (uploadedFiles.length + validFiles.length >= maxCount) {
                alert("최대 5개까지 업로드 할 수 있습니다");
                break; // 5개 넘기면 더 이상 파일을 처리하지 않음
            }

            // 3. 파일 크기 검사
            if (file.size > maxSize) {
                alert(`${file.name} : 20MB 초과`);
                continue;
            }

            // 4. 중복 파일명 검사
            if (uploadedFiles.some(f => f.name === file.name) || validFiles.some(f => f.name === file.name)) {
                alert(`${file.name}은 이미 업로드 되어 있습니다.`);
                continue;
            }
            validFiles.push(file);
        }

        // 유효한 파일만 상태에 추가
        if (validFiles.length > 0) {
            setUploadedFiles(prevFiles => [...prevFiles, ...validFiles]);
        }

        // 파일 input 초기화(같은 파일 재선택 가능하도록)
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [uploadedFiles, existingFiles, filesToDeleteIds]);   // uploadedFiles가 변경될 때마다 함수 재생성

    // 파일 입력(input)의 change 이벤트 핸들러
    const onFileInputChange = (e) => {
        handleFiles(e.target.files);
    };

    // 새로 업로드 된 파일 삭제 함수
    const deleteFile = (fileName, fileSize) => {
        setUploadedFiles(prevFiles => {
            const updatedFiles = prevFiles.filter(f => !(f.name === fileName && f.size === fileSize));
            return updatedFiles;
        });
    };

    // 기존 파일 삭제 함수(서버에 파일 ID 전송 대기)
    const deleteExistingFile = (fileId) => {
        // existingFiles 목록에서만 시각적으로 제거하고, fileToDeleteIds에 Id를 추가
        if(!filesToDeleteIds.includes(fileId)){
            setFilesToDeleteIds(prevIds => [...prevIds, fileId]);
        }
    };

    // 드래그 앤 드롭 이벤트(useEffect 사용해서 들어오면 하나 추가 삭제하면 하나 삭제)
    useEffect(() => {
        const uploadArea = uploadAreaRef.current;
        if (!uploadArea) return;

        // 드래그 시 시각효과
        const handleDragOver = (e) => {
            e.preventDefault();
            uploadArea.classList.add("dragover");
        }

        // 드래그 해온 거 빠지면 dragover 시각효과 사라짐
        const handleDragLeave = () => {
            uploadArea.classList.remove("dragover");
        }

        // 파일 드롭 시 처리
        const handleDrop = (e) => {
            e.preventDefault();
            uploadArea.classList.remove("dragover");
            handleFiles(e.dataTransfer.files);
        }

        uploadArea.addEventListener("dragover", handleDragOver);
        uploadArea.addEventListener("dragleave", handleDragLeave);
        uploadArea.addEventListener("drop", handleDrop);

        // 컴포넌트 언마운트 시 이벤트 제거
        return () => {
            uploadArea.removeEventListener("dragover", handleDragOver);
            uploadArea.removeEventListener("dragleave", handleDragLeave);
            uploadArea.removeEventListener("drop", handleDrop);
        };
    }, [handleFiles]);      // handleFiles(즉 uploadFiles)가 변경될 때마다 useEffect 재실행


    // 기존 게시글 데이터 로딩
    useEffect(() => {

        // boardId가 없으면 API 호출을 건너뜁니다.
    if (!boardId) return; 
    
    // 이 부분이 실제 GET 요청 로직입니다.
    const getBoardDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/api/board/${boardId}`);
            const data = response.data.board; // 응답 데이터 구조에 따라 수정 필요
            
            // 1. 텍스트 상태 설정
            setTitle(data.boardTitle);
            setWriter(data.boardWriter);
            setBoardContents(data.boardContents);

            // 2. 기존 파일 상태 설정 (파일 목록이 Board DTO 안에 있어야 함)
            setExistingFiles(data.fileList || []); // 이 부분이 핵심
            
        } catch (error) {
            console.error("게시글 로딩 실패:", error);
            // 에러 처리
        }
    };
    
    getBoardDetail();
}, [boardId]); // boardId가 변경될 때마다 실행 (보통 한 번)
        




        
        // if (boardId){
            // 게시글 상세 정보와 첨부파일을 가져오는 API 호출(GET / api/board/{id})
            // axios.get(`http://localhost:8090/api/board/${boardId}`)
            //     .then(response => {
            //         const data = response.data.board;   // BoardDto가 포함된 BoardDetailResponse에서 추출
            //         if(!data) throw new Error("게시글 데이터가 없습니다");
                    
            //         setTitle(data.boardTitle);
            //         setWriter(data.boardWriter);
            //         setBoardContents(data.boardContents);

            //         // 기존 첨부파일 설정(파일목록은 boardFileDtoList)
            //         if(data.boardFileDtoList){
            //             setExistingFiles(data.boardFileDtoList);
            //         }
            //     })
            //     .catch(error => {
            //         console.error("게시글 로딩 실패: ", error);
            //         alert("게시글 정보를 불러오는데 실패하였습니다");
            //         navigate('/board/paging');
            //     });
    //     }
    // }, [boardId, navigate]);


    // 수정 제출 버튼 핸들러(API 호출 로직)
    const handleSubmit = (e) => {
        e.preventDefault();

        // 필수 입력 항목 유효성 검사 (추가 필요)
        // const boardTitle = e.target.elements.boardTitle.value;
        // const boardWriter = e.target.elements.boardWriter.value;
        // const boardPass = e.target.elements.boardPass.value;

        if (!title || !writer || !password || !boardContents) {
            alert("제목, 글쓴이, 비밀번호, 내용을 모두 입력해주세요.");
            return; // 유효성 검사 실패 시 전송 중단
        }

        const formData = new FormData();    

        // 폼 데이터 추가
        // boardId는 URL에서 가져와 사용하며 서버에서는 @PathVariable로 받음
        formData.append("boardTitle", title);   // 수정된 제목
        formData.append("boardWriter", writer); // 작성자
        formData.append("boardPass", password); // 비밀번호
        
        // CKEditor 내용 추가
        formData.append("boardContents", boardContents);

        // 파일들을 formData에 추가
        uploadedFiles.forEach(file => {
            formData.append("uploadFiles", file); // 서버 컨트롤러의 @RequestParam은 "uploadFiles"
        });

        // 삭제할 기존 파일 ID 목록을 formData에 추가
        filesToDeleteIds.forEach(id => {
            formData.append("deleteFileIds", id);   // 서버 컨트롤러의 @RequestParam은 "deleteFileIds"
        })

        console.log("폼 데이터 전송 준비 완료. 파일 개수: ", uploadedFiles.length);


        // axios를 이용한 서버 전송
        axios.put(`http://localhost:8090/api/board/update/${boardId}`, formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data'
                // 명시하지 않으면 브라우저가 boundary를 자동으로 설정하는 듯?
            }
        })
            .then(res => {
                alert("게시글이 성공적으로 작성되었습니다.");
                navigate(`/board/${boardId}`); // 수정된 상세 게시글 페이지로 이동
            })
            .catch(error => {
                const status = error.response?.status;
                if (status === 401){
                    alert("비밀번호가 일치하지 않아 수정을 완료할 수 없습니다");
                }else{
                    console.error("게시글 작성 실패: ", error.response?.data || error);
                    alert("게시글 작성 중 오류가 발생했습니다.");
                }
            });

    };

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


                {/* <!-- 게시글 수정 공간 --> */}
                <main>
                    <div className="layoutCenter">

                        {/* <!-- 문의사항 ?, 별 아이콘 ..... --> */}
                        <div className="sub-title">
                            {/* <!-- 문의사항, 아이콘 --> */}
                            <div className="inquiry">
                                <h3>게시글 수정</h3>
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
                            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">

                                {/* <!-- 제목 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>제목</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardTitle"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>

                                {/* <!-- 글쓴이 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>글쓴이</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardWriter" 
                                                value={writer}
                                                readOnly
                                                style={{backgroundColor: '#f0f0f0', cursor:'not-allowed'}}
                                        />
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>

                                {/* <!-- 비밀번호 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>비밀번호</div>
                                        <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardPass"
                                                value={password}
                                                onChange={(e) => {setPassword(e.target.value)}}
                                        />
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
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={boardContents}    // 불러온 내용으로 초기화
                                                        config={editorConfig}
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
                                            {/* 기존 파일과 새 파일 모두 없다면 '파일을 드래그하여 첨부할 수 있습니다' 보여줘야지 */}
                                            {(existingFiles.length - filesToDeleteIds.length === 0) && uploadedFiles.length === 0 ? (
                                                <p>파일을 드래그하여 첨부할 수 있습니다</p>
                                            ) : (
                                                <div className="preview-container">
                                                    {/* 기존 첨부파일 목록 렌더링 */}
                                                    {existingFiles
                                                        .filter(file => !filesToDeleteIds.includes(file.fileId))    // 삭제 예정이 아닌 파일들만 필터링 
                                                        .map((file, index) => (
                                                        // key는 React가 목록 요소를 식별하는 데 도움을 줍니다.
                                                        <React.Fragment key={`existing-${file.fileId}`}>
                                                            {/* 첫 번째 요소가 아닐 경우에만 점선 추가 */}
                                                            {index > 0 && (
                                                                <div className="line-dotted-preview"></div>
                                                            )}

                                                            <div className="preview-box">
                                                                <div>
                                                                    <div className="file-name">{file.originalFilename}</div>
                                                                    <div className="file-size">{formatBytes(file.fileSize)}</div>
                                                                </div>
                                                                <button
                                                                    className="delete-btn"
                                                                    type="button"
                                                                    onClick={() => deleteExistingFile(file.fileId)}
                                                                >
                                                                    <i className="fa-solid fa-trash fa-lg"></i>
                                                                </button>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}

                                                    {/* 새로 업로드 된 파일 목록 렌더링 */}
                                                    {uploadedFiles.map((file, index) =>
                                                        <React.Fragment key={`new-${file.name + file.size}`}>
                                                            {/* 파일이 있을때만 점선 보이기 */}
                                                            {((existingFiles.length - filesToDeleteIds.length > 0) || index > 0) && <div className="line-dotted-preview"></div>}
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
                                                    )}
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


