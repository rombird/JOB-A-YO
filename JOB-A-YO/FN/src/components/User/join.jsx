import React, { useState } from "react";
import axios from "axios";

const User = () => {
    const [email_id , setEmailId] = useState();
    const [password , setPassword] = useState();
    const [addr , setAddr] = useState();
    const [username, setUsername] = useState();
    
  
    const userHandler = (e) => {
      
      axios
      .post(
        `http://localhost:8092/user/join`,                          //URL
        {"id":email_id,"password":password,"addr":addr,"username":username},    //PARAM
        {headers: {'Content-Type': 'application/json'}}             //CONTENT_TYPE
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('error.response.data', error.response.data);
        setMessage(error.response.data)
      });
        
    };
  return (
    <div>
      <div class="box layoutCenter">
            <div class="title">
                <h1>JOBAYO </h1>
                <h2>회원가입</h2>
            </div>
            <ul class="step">
                <li class="on">
                    <div class="num"><em class="done">1</em></div>
                    <p>약관동의</p>
                </li>
                <li class="on">
                    <div class="num"><em class="active">2</em></div>
                    <p>회원정보</p>
                </li>
            </ul>
            <div class="provide-points">
                <b>회원가입 관련 정보입력시, 필수항목은 반드시 작성하셔야 회원가입이 가능합니다.</b>
                <b>SMS, 이메일 및 카카오톡 수신 동의 여부 '아니오' 선택할 시, 맞춤형 지원사업 안내 및 지원사업 신청 상태 알림을 받을 수 없습니다.</b>
            </div>
            <form class="join-form" form="post">
                <dl>
                    <dt>아이디(이메일)</dt>
                    <dd>
                        <input type="email" name="userid" readonly required onChange={(e)=>{setEmailId(e.target.value)}} />
                    </dd>
                </dl>
                <dl>
                    <dt>이름</dt>
                    <dd>
                        <input type="text" name="username" required onChange={(e)=>{setUsername(e.target.value)}} />
                    </dd>
                </dl>
                <dl>
                    <dt>생년월일</dt>
                    <dd class="select-div">
                        <select name="birthYear" id="birthYear" required>
                            <option value="2025" selected>2025년</option>
                            <option value="2024">2024년</option>
                            <option value="2023">2023년</option>
                            <option value="2022">2022년</option>
                            <option value="2021">2021년</option>
                            <option value="2020">2020년</option>
                            <option value="2019">2019년</option>
                            <option value="2018">2018년</option>
                            <option value="2017">2017년</option>
                            <option value="2016">2016년</option>
                            <option value="2015">2015년</option>
                            <option value="2014">2014년</option>
                        </select>
                        <select name="birthMonth" id="birthMonth" required>
                            <option value="01" selected>01월</option>
                            <option value="02">02월</option>
                            <option value="03">03월</option>
                            <option value="04">04월</option>
                            <option value="05">05월</option>
                            <option value="06">06월</option>
                            <option value="07">07월</option>
                            <option value="08">08월</option>
                            <option value="09">09월</option>
                            <option value="10">10월</option>
                            <option value="11">11월</option>
                            <option value="12">12월</option>
                        </select>
                        <select name="birthDay" id="birthDay" required>
                            <option value="01" required="">01일</option>
                            <option value="02">02일</option>
                            <option value="03">03일</option>
                            <option value="04">04일</option>
                            <option value="05">05일</option>
                            <option value="06">06일</option>
                            <option value="07">07일</option>
                            <option value="08">08일</option>
                            <option value="09">09일</option>
                            <option value="10">10일</option>
                            <option value="11">11일</option>
                            <option value="12">12일</option>
                            <option value="13">13일</option>
                            <option value="14">14일</option>
                            <option value="15">15일</option>
                            <option value="16">16일</option>
                            <option value="17">17일</option>
                            <option value="18">18일</option>
                            <option value="19">19일</option>
                            <option value="20">20일</option>
                            <option value="21">21일</option>
                            <option value="22">22일</option>
                            <option value="23">23일</option>
                            <option value="24">24일</option>
                            <option value="25">25일</option>
                            <option value="26">26일</option>
                            <option value="27">27일</option>
                            <option value="28">28일</option>
                            <option value="29">29일</option>
                            <option value="30">30일</option>
                            <option value="31">31일</option>
                        </select>
                    </dd>
                </dl>
                <dl>
                    <dt>성별</dt>
                    <dd class="gender-check">
                        <label for="man">
                            <input type="radio" name="gender" id="man" value = "man" />
                            남자
                        </label>
                        <label for="woman">
                            <input type="radio" name="gender" id="woman" value = "woman" />
                            여자
                        </label>
                    </dd>
                </dl>
                <dl>
                    <dt>연락처</dt>
                    <dd>
                        <input type="text" id="phoneNumber" name = "phoneNumber" placeholder="   (- 없이 숫자만 입력)" required />
                    </dd>
                </dl>
                <dl>
                    <dt>비밀번호</dt>
                    <dd>
                        <input type="password" name = "password" required onChange={(e)=>{setPassword(e.target.value)}} />
                        <div class="guide">
                            영문 대소문자, 숫자, 특수문자를 혼합하여 8~15자 이내로 입력해주세요
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt>비밀번호 확인</dt>
                    <dd>
                        <input type="password" name="rePassword" required />
                    </dd>
                </dl>
                <dl class = "addr-dl">
                    <dt>주소</dt>
                        
                </dl>
                <div class="line"></div>
                <dl class="keyword-dl">
                    <dt>관심 창업 아이템</dt>
                    <dd class="keyword-checkbox">
                        <label for="bigdata">
                            <input type="checkbox" name="keyword"  value="bigdata" id = "bigdata" />
                            온라인 비즈니스
                        </label>
                        <label for="color">
                            <input type="checkbox" name="keyword" value="color" id = "color" />
                            오프라인 소매업
                        </label>
                        <label for="seasonTrend">
                            <input type="checkbox" name="keyword" value="seasonTrend" id="seasonTrend" />
                            푸드/외식업
                        </label>
                        <label for="style">
                            <input type="checkbox" name="keyword" value="style" id="style" />
                            전문 서비스업
                        </label>
                        <label for="style">
                            <input type="checkbox" name="keyword" value="style" id="style" />
                            지식/컨텐츠 사업
                        </label>
                        <label for="style">
                            <input type="checkbox" name="keyword" value="style" id="style" />
                            기타
                        </label>
                        <div class = "keyword-guide">
                            1개 이상 선택해 주세요.
                            맞춤형 콘텐츠를 제공 받을 수 있습니다.
                        </div> 
                    </dd>
                </dl>
                <dl class = "recieve-dl">
                    <dt>수신여부(선택)</dt>
                    <dd class = "recieve-checkbox">
                        <label for="recieveSMS">
                            <input type="checkbox" name="recieve" value="recieveSMS" id="recieveSMS" />
                            SMS 수신
                        </label>
                        <label for="recieveEmail">
                            <input type="checkbox" name="recieve" value="recieveEmail" id="recieveEmail" />
                            이메일 수신
                        </label>
                        <div class="recieve-guide">
                            수신 여부는 마이페이지>회원정보 수정에서 변경하실 수 있습니다.
                        </div>
                    </dd>
                </dl>
                <div class = "line"></div>
                <div class = "cancel-join">
                    <a href="javascript:void(0)">취소</a>
                    <button id = "join_btn" href="javascript:void(0)" onClick={userHandler} >회원가입</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Join;
