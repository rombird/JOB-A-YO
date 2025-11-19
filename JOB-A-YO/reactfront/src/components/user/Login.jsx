
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import "../../css/common.css";
import "../../css/login.css";



const Login = ()=>{
    const navigate = useNavigate();
    
    return (
        <>
            
   
        {/* @font-face {
            font-family: 'nexonBold';
            src: url('./font/NEXONLv1GothicBold.ttf');
            font-style: normal;
        }
        @font-face {
            font-family: 'nexonLight';
            src: url('./font/NEXONLv1GothicLight.ttf');
            font-style: normal;
        }
        @font-face {
            font-family: 'nexonRegular';
            src: url('./font/NEXONLv1GothicRegular.ttf');
            font-style: normal;
        }
        @font-face {
            font-family: 'logo';
            src: url('./font/BitcountGridDouble-SemiBold.ttf');
            font-style: normal;
        } */}

    





    <div className="custom">
        <header className="header">
            <div className="topHeader">
                <div className="topList layoutCenter">
                    <ul className="topNav">
                        <li className="topNavli">
                            <a className="login" href="./login.html"><img className="imgLogin" src="image/person.svg" alt=""/>로그인</a>
                        </li>
                        <li className="topNavli">
                            <a className="join" href="./join.html">회원가입</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="navHeader">
                {/* <!-- layoutCenter를 줄지 말지 풀드롭다운에 영향 미칠지 확인 --> */}
                <div className="detailnav layoutCenter"> 
                    <h1><a href="/main.html">LOGO</a></h1>
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
                                        <a href="javascript:void(0)">문의사항</a>
                                    </li>
                                    <li className="subList">
                                        <Link to="/board/Paging">커뮤니티</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        {/* <!-- 로그인 폼 있는 공간 --> */}
        <div className="sign-in layoutCenter">
            <main>
                <h2>로그인</h2>
                <div className="under-line"></div>
                <div className="login">
                    <form method="post" id="login-form" className="form">
                        <dt>아이디 (이메일)</dt>
                        <input type="text" name="userEmail"/>
                        <dt>비밀번호</dt>
                        <input type="password" name="userpassword"/>
                        <input type="submit" value="로그인" id="login-submit" className="submit-block"/>
                    </form>
                    <div className="tx_btns">
                        <a className="login-a-tag" href="./join.html">회원가입</a>
                        <div>
                            <a className="login-a-tag" href="javascript:void(0)">아이디 찾기</a>
                            <a className="login-a-tag" href="javascript:void(0)">비밀번호 찾기</a>
                        </div>
                    </div>
                </div>

            </main>
        </div>
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
        
        </>

    )

}

export default Login;


