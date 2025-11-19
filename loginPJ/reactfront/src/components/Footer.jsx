import {useState,useEffect} from 'react'
import axios from 'axios'
import "../../css/common.css";


const Header = () => {
    return (
        <>
            <footer class="">
                <div class="mainFooter layoutCenter">
                    <div class="footerLogo">
                        <h1>JOB-A-YO</h1>
                    </div>
                    <div class="footerInfo">
                        <div class="footerInfoL">
                            <p>대구광역시 중구 중앙대로 366</p>
                            <p>임과 함께</p>
                            <p>admin@gmail.com</p>
                            <p>053-123-4567</p>
                        </div>
                        <div class="footerInfoR">
                            <ul class="site">
                                <li><a href="javascript:void(0)">FAQ</a></li>
                                <li><a href="javascript:void(0)">사이트맵</a></li>
                            </ul>
                            <ul class="related">
                                <li><a href="javascript:void(0)">관련기관정보</a></li>
                            </ul>
                            <ul class="personInfo">
                                <li><a href="javascript:void(0)">개인정보처리방침</a></li>
                                <li><a href="javascript:void(0)">이용약관</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        
        </>
    )


}