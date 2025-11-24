import axios from 'axios'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import api from '../../api/axiosConfig'; 

import "../../css/login.css";
import "../../css/writeBoard.css";
import "../../css/login.css";


class MyUploadAdapter{
    constructor(loader){
        this.loader = loader;
        // 서버의 이미지 업로드 API 엔드포인트
        // NOTE: 이 부분은 api 인스턴스가 아닌 일반 axios를 사용하고 있습니다. 
        // 만약 여기에 인터셉터 등의 로직이 필요하다면 api 인스턴스를 사용하도록 수정해야 합니다.
        this.url = 'http://localhost:8090/api/board/image/upload'; 
    }

    upload(){
        return this.loader.file
            .then(file => {
                const data = new FormData();
                data.append('upload', file);

                // CKEditor 이미지 업로드는 토큰 재발급 로직이 불필요할 수 있어 axios를 유지하거나,
                // api 인스턴스를 사용하려면 URL을 상대경로로 바꿔야 합니다. 
                // 여기서는 기존 코드를 유지하여 axios를 사용합니다.
                return axios.post(this.url, data, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                .then(res => {
                    if (res.data.uploaded){
                        return{
                            default: res.data.url
                        };
                    }else{
                        throw new Error('Image upload failed');
                    }
                })
                .catch(error => {
                    console.error("CKEditor 이미지 업로드 에러:", error);
                    // 에러 발생 시 Promise를 reject하여 CKEditor에 실패를 알립니다.
                    return Promise.reject(error);
                });
            });
    }

    abort(){
        // 업로드 취소 로직
    }
}


function MyCustomUploadAdapterPlugin(editor){
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}

// 게시글 등록, 수정 모두 가능
const WriteBoard = () => {
    const { id } = useParams(); // 글쓰기 수정 작업
    const navigate = useNavigate();

    // 상태관리
    const [boardContents, setBoardContents] = useState("");
    const [uploadedFiles, setUploadFiles] = useState([]);

    // DOM 요소 참조
    const uploadAreaRef = useRef(null);
    const fileInputRef = useRef(null);

    // 파일 처리 로직 (기존 코드 유지)
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    // 파일 유효성 검사 및 추가하는 함수 (기존 코드 유지)
    const allowedExtensions = ['xlsx', 'pptx', 'txt', 'pdf', 'jpg', 'jpeg', 'png', 'hwp'];
    const maxCount = 5;
    const maxSize = 20 * 1024 * 1024; // 20MB
    // 참고: 두 번째 요청의 주석은 6MB로 되어 있으나, 로직은 20MB이므로 로직을 따라 20MB로 유지합니다.

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

            // 2. 파일 개수 제한 검사
            if (uploadedFiles.length + validFiles.length >= maxCount) {
                alert(`최대 ${maxCount}개까지 업로드 할 수 있습니다`);
                break;
            }

            // 3. 파일 크기 검사
            if (file.size > maxSize) {
                alert(`${file.name} : ${formatBytes(maxSize)} 초과`);
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
            setUploadFiles(prevFiles => [...prevFiles, ...validFiles]);
        }

        // 파일 input 초기화
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [uploadedFiles]);

    // 파일 입력(input)의 change 이벤트 핸들러
    const onFileInputChange = (e) => {
        handleFiles(e.target.files);
    };

    // 파일 삭제 함수
    const deleteFile = (fileName, fileSize) => {
        setUploadFiles(prevFiles => {
            const updatedFiles = prevFiles.filter(f => !(f.name === fileName && f.size === fileSize));
            return updatedFiles;
        });
    };
    
    // 드래그 앤 드롭 이벤트 등록 (기존 코드 유지)
    useEffect(() => {
        const uploadArea = uploadAreaRef.current;
        if (!uploadArea) return;

        const handleDragOver = (e) => {
            e.preventDefault();
            uploadArea.classList.add("dragover");
        }

        const handleDragLeave = () => {
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
        };
    }, [handleFiles]);


    // CKEditor 설정 객체 정의
    const editorConfig = {
        image: {
            upload: {
                types: ['png', 'jpeg', 'gif', 'bmp', 'webp'],
                withCredentials: true,
            }
        },
        extraPlugins: [MyCustomUploadAdapterPlugin],
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertImage', 'mediaEmbed', 'undo', 'redo' ]
    };

    // 게시글 등록 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작(새로고침)을 막습니다.
        // 폼 데이터를 가져옵니다 (파일 포함)
        const form = e.target;
        const boardTitle = form.elements.boardTitle ? form.elements.boardTitle.value : '';
        const boardWriter = form.elements.boardWriter ? form.elements.boardWriter.value : ''; // 비회원 작성자 필드가 없는 경우 대비
        const boardPass = form.elements.boardPass ? form.elements.boardPass.value : ''; // 비밀번호 필드가 없는 경우 대비

        // 필수 입력 항목 유효성 검사 (기존 로직 유지)
        if (!boardTitle || !boardWriter || !boardPass || !boardContents) {
            alert("제목, 글쓴이, 비밀번호, 내용을 모두 입력해주세요.");
            return;
        }

        const formData = new FormData(form);

        // CKEditor 내용 추가
        formData.append("boardContents", boardContents);

        // 파일들을 formData에 추가
        uploadedFiles.forEach(file => {
            formData.append("fileUpload", file); // fileUpload는 서버에서 파일 받을 때 쓰는 이름
        });

        console.log("폼 데이터 전송 준비 완료. 파일 개수: ", uploadedFiles.length);
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
                navigate('/board/paging');  // 게시글 목록 페이지로 이동
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
                                <div><i style={{ color: '#3A6B71' }} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                            </div>
                            <div className="write-area">
                                <input className="write-input" type="text" name="boardTitle" />
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
                                <input className="write-input" type="text" name="boardWriter" />
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
                                <input className="write-input" type="text" name="boardPass" />
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
                                    {uploadedFiles.length === 0 ? (
                                        <p>파일을 드래그하여 첨부할 수 있습니다</p>
                                    ) : (
                                        <div className="preview-container">
                                            {uploadedFiles.map((file, index) => (
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

                        <div className="line-dotted"></div>

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
                                                data=""
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
                        <div className="under-line-dotted line-dotted"></div>
                    </form>
                    {/* <!-- 제출 버튼 있는 줄 --> */}
                    <div className="submit-box layoutCenter">
                        <button className="submit-btn" type="submit" >등록</button>
                        <button type="button" className="btn btn-outline-success btn-lg">
                            <Link to="/board/paging">목록</Link>
                        </button>
                    </div>
                </div>
            </div>
            

        </>

    )

}

export default WriteBoard;


