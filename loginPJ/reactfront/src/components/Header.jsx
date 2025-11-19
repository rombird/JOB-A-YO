import {useState,useEffect} from 'react'
import axios from 'axios'
import "../../css/common.css";

const Header = () => {

    return(
        <>
            <header class="header">
                <div class="topHeader">
                    <div class="topList layoutCenter">
                        <ul class="topNav">
                            <li class="topNavli">
                                <Link to="/login"><img class="imgLogin" src="/images/login.svg" alt="로그인"/>로그인</Link>
                            </li>
                            <li class="topNavli">
                                <Link to="user/join"><img class="imgJoin" src="/images/join.svg" alt="회원가입"/>회원가입</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="navHeader">
                    <div class="detailnav layoutCenter"> 
                        <h1><Link to="/">JOB-A-YO</Link></h1>
                        <div class="wrap">
                            <ul class="mainNav">
                                <li class="mainList">
                                    <div class="listLine">
                                        <a class="mainMenu" href="javascript:void(0)">상권트렌드</a>
                                    </div>
                                </li>
                                <li class="mainList">
                                    <div class="listLine">
                                        <a class="mainMenu" href="javascript:void(0)">나는 사장</a>
                                    </div>
                                </li>
                                <li class="mainList">
                                    <div class="listLine">
                                        <a class="mainMenu" href="javascript:void(0)">나도 곧 사장</a>
                                    </div>
                                </li>
                                <li class="mainList">
                                    <div class="listLine">
                                        <a class="mainMenu" href="javascript:void(0)">이용안내</a>
                                    </div>
                                    <ul class="subNav">
                                        <li class="subList">
                                            <a href="javascript:void(0)">공지사항</a>
                                        </li>
                                        <li class="subList">
                                            <a href="javascript:void(0)">문의사항</a>
                                        </li>
                                        <li class="subList">
                                            <a href="javascript:void(0)">커뮤니티</a>
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