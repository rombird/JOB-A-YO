
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import "../../css/login.css";
import "../../css/writeBoard.css";


const WriteBoard = () => {
    const navigate = useNavigate();

    const test1 = (endPoint, ...params) => {

    }

    return (
        <>


            {/* <link rel="stylesheet" href="@{/css/common.css}">
    <link rel="stylesheet" href="@{/css/writeBoard.css}">

    <!-- 부트스트랩 css -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    <!-- ckEditor css -->
    <link rel="stylesheet" href="@{/css/ckEditorStyle.css}">
    <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/47.1.0/ckeditor5.css" crossorigin> */}



            {/* <!--    <style>-->
<!--        @font-face {-->
<!--            font-family: 'nexonBold';-->
<!--            src: url('/font/NEXONLv1GothicBold.ttf');-->
<!--            font-style: normal;-->
<!--        }-->
A
<!--            font-family: 'nexonLight';-->
<!--            src: url('/font/NEXONLv1GothicLight.ttf');-->
<!--            font-style: normal;-->
<!--        }-->

<!--        @font-face {-->
<!--            font-family: 'nexonRegular';-->
<!--            src: url('/font/NEXONLv1GothicRegular.ttf');-->
<!--            font-style: normal;-->
<!--        }-->

<!--        @font-face {-->
<!--            font-family: 'logo';-->
<!--            src: url('/font/BitcountGridDouble-SemiBold.ttf');-->
<!--            font-style: normal;-->
<!--        }-->
<!--    </style>--> */}





            <div className="custom">
                <header className="header">
                    <div className="topHeader">
                        <div className="topList layoutCenter">
                            <ul className="topNav">
                                <li className="topNavli">
                                    <a className="login" href="/user/login"><img class="imgLogin" src="@{/image/person.svg}" alt=""/>로그인</a>
                                </li>
                                <li class="topNavli">
                                    <a className="join" href="/user/join">회원가입</a>
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
                                            <a className="mainMenu" href="javascript:void(0)">빅데이터 상권 분석</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="javascript:void(0)">맞춤형정보</a>
                                            </li>
                                            <li className="subList">
                                                <a href="javascript:void(0)">맞춤형정보2</a>
                                            </li>
                                            <li className="subList">
                                                <a href="javascript:void(0)">상권정보3</a>
                                            </li>
                                        </ul>

                                    </li>
                                    <li className="mainList">
                                        <div className="listLine">
                                            <a className="mainMenu" href="javascript:void(0)">상권시장 TREND</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="javascript:void(0)">Trend NOW</a>
                                            </li>
                                            <li className="subList">
                                                <a href="javascript:void(0)">NEWS</a>
                                            </li>
                                            <li className="subList">
                                                <a href="javascript:void(0)">Trend 3</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="mainList">
                                        <div className="listLine">
                                            <a className="mainMenu" href="javascript:void(0)">소상공인 대시보드</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="javascript:void(0)">내 가게 경영진단</a>
                                            </li>
                                            <li className="subList">
                                                <a href="javascript:void(0)">커뮤니티</a>
                                            </li>
                                            <li className="subList">
                                                <a href="javascript:void(0)"></a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="mainList">
                                        <div className="listLine">
                                            <a className="mainMenu" href="javascript:void(0)">이용안내</a>
                                        </div>
                                        <ul className="subNav">
                                            <li className="subList">
                                                <a href="javascript:void(0)">공지사항</a>
                                            </li>
                                            <li className="subList">
                                                <a href="/board/paging">문의사항</a>
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
                            <form action="/board/writeBoard" method="post" enctype="multipart/form-data">

                                {/* <!-- 제목 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>제목</div>
                                        <div><i style={{color: '#3A6B71'}} class="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardTitle"/>
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>

                                {/* <!-- 글쓴이 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>글쓴이</div>
                                        <div><i style={{color: '#3A6B71'}} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardWriter"/>
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>

                                {/* <!-- 비밀번호 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area">
                                        <div>비밀번호</div>
                                        <div><i style={{color: '#3A6B71'}} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area">
                                        <input className="write-input" type="text" name="boardPass"/>
                                    </div>
                                </div>

                                {/* <!-- 점선 --> */}
                                <div className="line-dotted"></div>


                                {/* <!-- 내용 부분 --> */}
                                <div className="label-and-writeArea">
                                    <div className="label-area content-label">
                                        <div>내용</div>
                                        <div><i style={{color: '#3A6B71'}} className="fa-solid fa-star-of-life fa-2xs"></i></div>
                                    </div>
                                    <div className="write-area content-area">
                                        <div className="main-container">
                                            <div className="editor-container editor-container_classic-editor" id="editor-container">
                                                <div className="editor-container__editor">
                                                    <textarea className="editor" name="boardContents" id="editor"></textarea>
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
                                                    <i className="fa-solid fa-upload"></i>
                                                </label>
                                        </div>
                                        <div className="upload" id="upload">
                                            <p>파일을 드래그하여 첨부할 수 있습니다</p>

                                            {/* <!-- <div class="preview-container">
                                                <div class="preview-box">
                                                    <div>
                                                        <div class="file-name">sample.txt</div>
                                                        <div class="file-size">1mb</div>
                                                    </div>
                                                    <button class="delete-btn"><i class="fa-solid fa-trash fa-lg"></i></button>
                                                </div>

                                                <div class="line-dotted-preview"></div>

                                                <div class="preview-box">
                                                    <div>
                                                        <div class="file-name">sample.txt</div>
                                                        <div class="file-size">1mb</div>
                                                    </div>
                                                    <button class="delete-btn"><i class="fa-solid fa-trash fa-lg"></i></button>
                                                </div>

                                                <div class="line-dotted-preview"></div>

                                                <div class="preview-box">
                                                    <div>
                                                        <div class="file-name">sample.txt</div>
                                                        <div class="file-size">1mb</div>
                                                    </div>
                                                    <button class="delete-btn"><i class="fa-solid fa-trash fa-lg"></i></button>
                                                </div> --> */}


                                            </div>

                                        </div>
                                    </div>


                                    {/* <!-- 점선 --> */}
                                    <div className="under-line-dotted line-dotted"></div>

                                    {/* <!-- 제출 버튼 있는 줄 --> */}
                                    <div className="submit-btn-group">

                                        <button style={{borderColor: '#3A6B71', color: '#335f64'}} type="submit" className="btn btn-outline-success btn-lg">제출</button>

                                        <input className="submit-btn" type="submit" id="submitBtn"/>
                                            <label for="submitBtn">
                                                <button style={{ borderColor: '#3A6B71', color: '#335f64'}} type="button" class="btn btn-outline-success btn-lg"><a href="/board/paging">목록</a></button>
                                            </label>
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
                                    <li><a href="javascript:void(0)">FAQ</a></li>
                                    <li><a href="javascript:void(0)">사이트맵</a></li>
                                </ul>
                                <ul className="related">
                                    <li><a href="javascript:void(0)">관련기관정보</a></li>
                                </ul>
                                <ul className="personInfo">
                                    <li><a href="javascript:void(0)">개인정보처리방침</a></li>
                                    <li><a href="javascript:void(0)">이용약관</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>






            {/* 
<!-- BootStrap js -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous">
</script>

<!-- fontawesome js -->
<script src="https://kit.fontawesome.com/f99de3d7af.js" crossorigin="anonymous"></script>

<!-- 내가 만든 JS -->
<script src="@{/js/writeBoard.js}"></script>


<!-- ckEditor -->
<!-- <script src="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"></script> -->
<script src="https://cdn.ckeditor.com/ckeditor5/47.1.0/ckeditor5.umd.js" crossorigin></script>
<script src="https://cdn.ckeditor.com/ckeditor5/47.1.0/translations/ko.umd.js" crossorigin></script>
<script src="https://cdn.ckbox.io/ckbox/2.6.1/ckbox.js" crossorigin></script>
<script src="@{/js/ckEditor.js}"></script> */}









        </>

    )

}

export default WriteBoard;


