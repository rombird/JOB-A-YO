import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SalesAnalysis from "../components/SalesAnalysis";
import KakaoMap from './KakaoMap';


import "../css/home.css"

function Home() {
    const [inputText, setInputText] = useState("");     // 입력창의 실시간 테스트
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState("");     // 검색 결과를 저장할 상태

    // 검색 버튼 클릭 함수
    const handleSearch = (e) => {
        e.preventDefault();     // form의 새로고침 방지
        if(!inputText.trim()){
            alert("검색어를 입력해주세요.");
            return;
        }
        setSearchKeyword(inputText);    // KakaoMap으로 전달될 키워드 업데이트
    };

    return (
        <>
            <main>
                <div className="mainBanner layoutCenter">
                    {/* 검색창 */}
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
                                     value={inputText}
                                     onChange={(e) => setInputText(e.target.value)}
                                     placeholder="관심있는 지역(행정동, 도로명 등) 및 가게를 검색하세요." />
                                    <button id="searchBtn"><img src="/images/search2.png" alt="돋보기 검색" />검색</button>
                                </form>
                            </div>
                            <div className="searchKey">
                                <ul className="keyList">
                                    <li><button >#keyword</button></li>
                                    <li><button >#keyword</button></li>
                                    <li><button >#keyword</button></li>
                                    <li><button >#keyword</button></li>
                                    <li><button >#keyword</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/*  카카오맵 */}
                    <div className='kakao-map-result'>
                        <div className='kakao-map'>
                            <KakaoMap
                                mapWidth="600px"
                                mapHeight="400px"
                                initialLat={37.497946}
                                initialLng={127.027621}
                                searchKeyword={searchKeyword}
                                onSearchComplete={setSearchResults} // 결과 데이터를 부모로 보내는 함수 
                            />
                        </div>
                        <div className='result-section' style={{display: 'flex', gap:'20px'}}>
                            <div 
                                className='result-list' style={{width: '300px', height: '400px', overflowY: 'auto', border: '1px solid', padding: '10px'}}>
                                <h3>검색 결과 ({searchResults.length})</h3>
                                {searchResults.length > 0? (
                                    <ul style={{listStyle: "none", padding: 0}}>
                                        {searchResults.map((place, index) => (
                                            <li key={index} style={{marginBottom: '15px', borderBottom: '1px solid #eee', pb: '10px'}}>
                                                <strong style={{color: '#2db7ad'}}>{place.place_name}</strong>
                                                <p style={{fontSize: '12px', margin: '5px 0'}}>{place.road_address_name}</p>
                                                <span style={{fontSize: '11px', color: '#888'}}>{place.phone}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>검색 결과가 없습니다</p>
                                )}
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
                                {/* <button className="btn">&lt;</button> */}
                                <div id="box" >
                                    <Link className="commercial" to="/trend" />
                                    <dl>
                                        <img src="/images/trend_img.png" alt="상권트렌드" />
                                        <dt>상권트렌드</dt>
                                        <dd>요즘 뜨는 주요 상권에 대한 <br />확인과 분석을 해보세요</dd>
                                    </dl>

                                </div>
                                <div id="box" >
                                    <Link className="girl" to="/myshop" />
                                    <dl>
                                        <img src="/images/girl_image.png" alt="나는 사장" />
                                        <dt>나는 사장</dt>
                                        <dd>지금 내 가게 주변의 상권분석과 <br /> 다양한 통계를 확인하세요</dd>
                                    </dl>
                                </div>
                                <div id="box">
                                    <Link className="man" to="newshop" />
                                    <dl>
                                        <img src="/images/man_img.png" alt="나도 곧 사장" />
                                        <dt>나도 곧 사장</dt>
                                        <dd>예비 사장님들을 위한 <br /> 전략적이고 스마트한 창업분석</dd>
                                    </dl>
                                </div>
                                {/* <button className="btn">&gt;</button> */}
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