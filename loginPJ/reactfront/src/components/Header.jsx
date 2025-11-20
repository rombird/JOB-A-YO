import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';

import "../css/common.css";


const Header = () => {
   
    return(
        <>
            <header className="header">
                <div className="topHeader">
                    <div className="topList layoutCenter">
                        <ul className="topNav">
                            <li className="topNavli">
                                <Link to="user/login" ><img className="imgLogin" src="/images/login.svg" alt="로그인"/>로그인</Link>
                            </li>
                            <li className="topNavli">
                                <Link to="user/join" ><img className="imgJoin" src="/images/join.svg" alt="회원가입"/>회원가입</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="navHeader">
                    <div className="detailnav layoutCenter"> 
                        <Link to="/" ><h1>JOB-A-YO</h1></ Link>
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
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        
        </>
    )
}
export default Header