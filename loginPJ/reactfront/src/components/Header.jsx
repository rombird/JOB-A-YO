import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../css/common.css";


const Header = () => {
    const { isLoggedIn, logout } = useAuth(); 
    return(
        <>
            <header className="header">
                <div className="topHeader">
                    <div className="topList layoutCenter">
                        <ul className="topNav">
                            {isLoggedIn ? (
                                // 로그인 상태
                                <>
                                    <li className="topNavli">
                                        <Link to="/mypage" ><img className="imgLogin" src="/images/login.svg" alt="마이페이지"/>마이페이지</Link>
                                    </li>
                                    <li className="topNavli">
                                        <Link to="" ><img className="imgJoin" src="/images/join.svg" alt="로그아웃"/>로그아웃</Link>
                                    </li>
                                </>
                            ) : (
                                // 로그아웃 상태
                                <>
                                    <li className="topNavli">
                                        <Link className="login" to="/login" ><img className="imgLogin" src="/images/login.svg" alt="로그인"/>로그인</Link>
                                    </li>
                                    <li className="topNavli">
                                        <Link className="join" to="/join" ><img className="imgJoin" src="/images/join.svg" alt="회원가입"/>회원가입</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="navHeader">
                    <div className="detailnav layoutCenter"> 
                        <Link className="logo" to="/" >JOB-A-YO</ Link>
                        <div className="wrap">
                            <ul className="mainNav">
                                <li className="mainList">
                                    <div className="listLine">
                                        <Link className="mainMenu" to="/trend" >상권트렌드</Link>
                                    </div>
                                </li>
                                <li className="mainList">
                                    <div className="listLine">
                                        <Link className="mainMenu" to="/myshop" >나는 사장</Link>
                                    </div>
                                </li>
                                <li className="mainList">
                                    <div className="listLine">
                                        <Link className="mainMenu" to="/newshop" >나도 곧 사장</Link>
                                    </div>
                                </li>
                                <li className="mainList">
                                    <div className="listLine">
                                        <Link className="mainMenu" to="/guide" >이용안내</Link>
                                    </div>
                                    <ul className="subNav">
                                        <li className="subList">
                                            <Link to="/notice" >공지사항</Link>
                                        </li>
                                        <li className="subList">
                                            <Link to="/inquiry" >문의사항</Link>
                                        </li>
                                        <li className="subList">
                                            <Link to="/community" >커뮤니티</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="mainList">
                                    <div className="chatList">
                                        <button className="chatbotBtn"><img className="chatbot" src="/images/chat.png" alt="chatbot이미지" /></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        
        </>
    )
}
export default Header;