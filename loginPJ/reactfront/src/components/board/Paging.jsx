import {Link} from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import "../../css/paging.css"
import "../../css/common.css"


const Paging = () => {
    // const { isLoggedIn, logout } = useAuth(); 
    
    const navigate = useNavigate(); // useNavigate 를 사용하여 이동함수 가져옴

    // 버튼 클릭 시 실행할 함수
    const handleRegisterClick = () => {
        // 새 글 등록 페이지의 경로로 이동합니다.
        navigate('/board/writeBoard'); 
    };
    
    return(
        <>
        {/* 로그인했을 때만 들어올 수 있도록  */}
           <div className="community">
            <div className="community-title layoutCenter">
                <h1>전체 게시글</h1>
                <p> HOME &gt; 이용안내 &gt; Community </p>
            </div>
            <div className="community-box layoutCenter">
                <div>
                    <button>최신글</button>
                    <button>인기글</button>
                    <button>댓글 많은 글</button>
                    <input type="text" placeholder='제목, 내용, 작성자, 태그 검색' />
                </div>
                <div className="article-box">
                    <div className="article">
                        <div className="article-main">
                            <Link>
                                <p>게시글 제목</p>
                                <p>게시글 내용</p>
                            </Link>
                        </div>
                        <div className="article-response">
                            <div className="read">
                                <img className="response-img" src="../images/read.png" alt="조회" />
                            </div>
                            <div className="comment">
                                <img className="response-img" src="../images/comment.png" alt="댓글" />
                            </div>
                            <div className="heart">
                                <img className="response-img" src="../images/heart.png" alt="좋아요" />
                            </div>
                        </div>
                    </div>
                    <div className="article">
                        <div className="article-main">
                            <Link to="/">
                                <p>게시글 제목</p>
                                <p>게시글 내용</p>
                            </Link>
                        </div>
                        <div className="article-response">
                            <div className="read">
                                <img className="response-img" src="../images/read.png" alt="조회" />
                            </div>
                            <div className="comment">
                                <img className="response-img" src="../images/comment.png" alt="댓글" />
                            </div>
                            <div className="heart">
                                <img className="response-img" src="../images/heart.png" alt="좋아요" />
                            </div>
                        </div>
                    </div>
                    <div className="article">
                        <div className="article-main">
                            <Link>
                                <p>게시글 제목</p>
                                <p>게시글 내용</p>
                            </Link>
                        </div>
                        <div className="article-response">
                            <div className="read">
                                <img className="response-img" src="../images/read.png" alt="조회" />
                            </div>
                            <div className="comment">
                                <img className="response-img" src="../images/comment.png" alt="댓글" />
                            </div>
                            <div className="heart">
                                <img className="response-img" src="../images/heart.png" alt="좋아요" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="community-bottom layoutCenter">
                    <div className="paging "></div>
                    <div className="createbtn">
                        <button className="board-create" onClick={handleRegisterClick}>등록</button>
                    </div>
                </div>
                
            </div>

           </div>
        
        
        </>
    )
}

export default Paging;