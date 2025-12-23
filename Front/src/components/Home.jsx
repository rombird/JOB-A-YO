import React, {useState, useRef, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SalesAnalysis from "../components/SalesAnalysis";

import "../css/home.css"

function Home(){
    const [inputText, setInputText] = useState("");     // 입력창의 실시간 테스트
    const navigate = useNavigate(); // 네비게이트 함수 선언
    const observerTarget = useRef(null);    // 스크롤 끝을 감지할 타겟 Ref
    const [pagination, setPagination] = useState(null);
    
    // 검색 버튼 클릭 함수
    const handleSearch = (e) => {
        e.preventDefault();     // form의 새로고침 방지
        if (!inputText.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }
        navigate(`/search?q=${encodeURIComponent(inputText)}`); // /search 페이지로 이동하면서 퀴리 스트링으로 전달
        // setSearchResults([]);   // 새로 검색 할 시 기존 리스트 초기화
        // setSearchKeyword(inputText);    // KakaoMap으로 전달될 키워드 업데이트
    };


    // 무한 스크롤 로직
    useEffect(() => {
        if(!pagination || !pagination.hasNextPage) return;

        const observer = new IntersectionObserver(
            (e) => {
                if (e[0].isIntersecting){
                    pagination.nextPage();  // 다음 페이지 불러오기
                }
            },
            {threshold: 1.0}
        );
        
        if(observerTarget.current){
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [pagination]);

    return(
        <>
            <main>
                <div className="mainBanner layoutCenter">
                    <div className="mainSearch">
                        <div className="searchBox">
                            <div className="search">
                                <form onSubmit={handleSearch}>
                                    <select name="langDiv" id="lang">
                                        <option value="kor" data-lang="한국어">한국어</option>
                                        <option value="eng" data-lang="영어">영어</option>
                                        <option value="jp" data-lang="일본어">일어</option>
                                    </select>
                                    <input 
                                        id="title" 
                                        type="text" 
                                        placeholder="관심있는 지역(행정동, 도로명 등) 및 가게를 검색하세요." 
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                    />
                                    <button id="searchBtn"><img src="/images/search2.png" alt="돋보기 검색" />검색</button>
                                </form>
                            </div>
                            <div className="searchKey">
                                <ul className="keyList">
                                    <li><button >#베이커리</button></li>
                                    <li><button >#카페</button></li>
                                    <li><button >#중식</button></li>
                                    <li><button >#한식</button></li>
                                    <li><button >#파스타</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subMain layoutCenter">    
                    <div className="subMain1">
                        <div className="bgImg">
                            <div className="title">
                                <p className="small">새롭게 바뀐 JOB-A-YO 상권분석 서비스</p>
                                <span className="desc1">더욱 쉽고 간편해진</span>
                                <span className="desc2">상권분석 서비스</span>
                            </div>
                            <div className="daegu"></div>
                        </div>
                        <div className="issue layoutCenter">
                            <div className="service"></div>
                            <div className="issueBoxes">
                                <div id="box" >
                                    <Link className="commercial" to="/search">
                                        <dl>
                                            <img src="/images/trend_img.png" alt="동네 리포트" />
                                            <dt>동네리포트</dt>
                                            <dd>궁금한 동네를 검색해보세요</dd>
                                        </dl>
                                    </Link>
                                </div>
                                <div id="box" >
                                    <Link className="girl" to="/myshop">
                                        <dl>
                                            <img src="/images/girl_image.png" alt="AI 예측 리포트" />
                                            <dt>AI 예측 리포트</dt>
                                            <dd>머신러닝이 분석한 <br />상권의 전망을 확인해보세요</dd>
                                        </dl>
                                    </Link>
                                </div>
                                <div id="box">
                                    <Link className="man" to="/custom">
                                        <dl>
                                            <img src="/images/man_img.png" alt="상권 통계" />
                                            <dt>상권 통계</dt>
                                            <dd>꼼꼼하게 비교하는 정밀 데이터로<br /> 스마트한 창업에 도전해보세요</dd>
                                        </dl>
                                    </Link>
                                </div>
                            </div>
                            <div className="issueEnd">
                            </div>
                        </div>
                    </div>
                    <div className="subMain2">
                        <div className="trend layoutCenter">
                            <div className="trendContent">
                                <div className="trendTitle">
                                    <h2>트렌드 정보</h2>
                                </div>
                                <div className="trendBox">
                                    {/* <div>일단은 width : 450px, height : 400px로 잡아둠 </div> */}
                                    <div><SalesAnalysis /></div>
                                    {/* <div>여기에 width를 지정하면 컴포넌트 가져왔을 때 css가 안먹힐 수 있으니까 css 가져올때 width, height 속성 제거하고 적용</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </>
    )
}

export default Home;