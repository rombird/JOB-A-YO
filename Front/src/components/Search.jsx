import React, { useState, useRef, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import KakaoMap from './KakaoMap';
import "../css/search.css";
import "../css/home.css";
import NaverTrendChart from './revenueAnalysis/NaverTrendChart';

function Search() {
    const location = useLocation();
    const [inputText, setInputText] = useState("");     // 입력창의 실시간 테스트
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);     // 검색 결과를 저장할 상태
    const [pagination, setPagination] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const mapRef = useRef();    // kakaoMap의 메서드에 접근하기 위한 ref
    const observerTarget = useRef(null);    // 스크롤 끝을 감지할 타겟 Ref

    // 검색 버튼 클릭 함수
    const handleSearch = (e) => {
        e.preventDefault();     // form의 새로고침 방지
        if (!inputText.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }
        setSearchResults([]);   // 새로 검색 할 시 기존 리스트 초기화
        setSearchKeyword(inputText);    // KakaoMap으로 전달될 키워드 업데이트
    };

    // kakaoMap에서 검색이 완료되면 데이터를 받는 함수
    const handleSearchComplete = (data, paging) => {
        setSearchResults(prev => [...prev, ...data]);   // 기존 결과에 추가 (더보기 대응)
        setPagination(paging);
        setTotalCount(paging.totalCount);
    };

    // 무한 스크롤 로직
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        if (query) {
            setInputText(query);        // 입력창에 표시
            setSearchKeyword(query);    // 실제 KakaoMap 검색 실행
        }
        if (!pagination || !pagination.hasNextPage) return;

        const observer = new IntersectionObserver(
            (e) => {
                if (e[0].isIntersecting) {
                    pagination.nextPage();  // 다음 페이지 불러오기
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [pagination, location.search]);

    return (
        <div className="neighborhood">
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
                </div>
            </div>
            <div className='kakao-map-result layoutCenter'>
                <div className='kakao-map'>
                    <KakaoMap
                        ref={mapRef}
                        mapWidth="1100px"
                        mapHeight="500px"
                        initialLat={37.497946}
                        initialLng={127.027621}
                        searchKeyword={searchKeyword}
                        onSearchComplete={handleSearchComplete} // 결과 데이터를 부모로 보내는 함수 
                    />
                </div>
                <div className='result-section'>
                    <div
                        className='result-list' >
                        <div className='result-head'>검색 결과 {totalCount}개</div>
                        {searchResults.length > 0 ? (
                            <>
                                <ul className='results' >
                                    {searchResults.map((place, index) => (
                                        <li className='result' key={index} onClick={() => mapRef.current.moveToLocation(place)} >
                                            <strong style={{ color: '#65A3FF', cursor: 'pointer' }}>{place.place_name}</strong>
                                            <p style={{ fontSize: '12px', margin: '5px 0' }}>{place.road_address_name}</p>
                                            <span style={{ fontSize: '11px', color: '#888' }}>{place.phone}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* 이 div가 보이면 다음 데이터를 가져오는 거임 */}
                                <div ref={observerTarget} style={{height: '20px', background: 'transparent'}}>
                                    {pagination?.hasNextPage && "로딩 중..."}
                                </div>
                                
                            </>

                        ) : (
                            <p>검색 결과가 없습니다</p>
                        )}
                    </div>
                </div>
            </div>
            <NaverTrendChart />
        </div>
    )
}
export default Search;