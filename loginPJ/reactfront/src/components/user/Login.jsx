
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import "../../css/common.css";
import "../../css/login.css";

const Login = ()=>{
    const navigate = useNavigate();

    const test1 =(endPoint, ...params)=>{
        
    }
    
    return (
        <>
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
        </>

    )

}

export default Login;


