import proj4 from 'proj4';
import rawData from '../assets/HangJungDong.json';

// 좌표계 정의 (공공데이터 표준 중부원점 EPSG:5174 -> 위경도 WGS84)
const firstProjection = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,483.35,664.43,0.0,0.0,0.0,0.0";
const secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
const guCodeMap = {
  "11110":"종로구",
  "11140":"중구",
  "11170":"용산구",
  "11200":"성동구",
  "11215":"광진구",
  "11230":"동대문구",
  "11260":"중랑구",
  "11290":"성북구",
  "11305":"강북구",
  "11320":"도봉구",
  "11350":"노원구",
  "11380":"은평구",
  "11410":"서대문구",
  "11440":"마포구",
  "11470":"양천구",
  "11500":"강서구",
  "11530":"구로구",
  "11545":"금천구",
  "11560":"영등포구",
  "11590":"동작구",
  "11620":"관악구",
  "11650":"서초구",
  "11680":"강남구",
  "11710":"송파구",
  "11740":"강동구",
};

// 데이터 가공 함수
const buildDongData = () => {
  const result = {};

  rawData.DATA.forEach(item => {
    const guCode = item.adstrd_cd.substring(0, 5);
    const guName = guCodeMap[guCode];

    if (guName) {
      if (!result[guName]) result[guName] = [];

      // 좌표 변환 (TM -> 위경도)
      // [x, y] 순서로 넣으면 [경도, 위도]가 나옵니다.
      const transformedPos = proj4(firstProjection, secondProjection, [
        parseFloat(item.xcnts_value),
        parseFloat(item.ydnts_value)
      ]);

      result[guName].push({
        name: item.adstrd_nm,
        lat: transformedPos[1], // 위도
        lng: transformedPos[0], // 경도
        area: parseFloat((item.relm_ar / 1000000).toFixed(2)) // m2 -> km2
      });
    }
  });

  return result;
};

// 최종적으로 사용할 데이터 export
export const dongDataByRegion = buildDongData();

export const categories = [
    '한식음식점',
    '중식음식점',
    '일식음식점', 
    '양식음식점',
    '제과점',
    '패스트푸드점', 
    '치킨전문점', 
    '분식전문점', 
    '호프-간이주점',
    '커피-음료'
];

// const regionData = [
//   { name: "강남구", lat: 37.4959, lng: 127.0664 
//   { name: "강동구", lat: 37.5492, lng: 127.1464 
//   { name: "강북구", lat: 37.6469, lng: 127.0147 
//   { name: "강서구", lat: 37.5657, lng: 126.8226 
//   { name: "관악구", lat: 37.4653, lng: 126.9438 
//   { name: "광진구", lat: 37.5481, lng: 127.0857 
//   { name: "구로구", lat: 37.4954, lng: 126.8581 
//   { name: "금천구", lat: 37.4600, lng: 126.9008 
//   { name: "노원구", lat: 37.6552, lng: 127.0771 
//   { name: "동대문구", lat: 37.5838, lng: 127.0507 
//   { name: "동작구", lat: 37.4965, lng: 126.9443 
//   { name: "마포구", lat: 37.5622, lng: 126.9087 
//   { name: "서대문구", lat: 37.5820, lng: 126.9356 
//   { name: "서초구", lat: 37.4769, lng: 127.0378 
//   { name: "성동구", lat: 37.5506, lng: 127.0409 
//   { name: "성북구", lat: 37.6069, lng: 127.0232 
//   { name: "송파구", lat: 37.5048, lng: 127.1144 
//   { name: "양천구", lat: 37.5270, lng: 126.8561 
//   { name: "영등포구", lat: 37.5206, lng: 126.9139 
//   { name: "용산구", lat: 37.5311, lng: 126.9811 
//   { name: "은평구", lat: 37.6176, lng: 126.9227 
//   { name: "종로구", lat: 37.5991, lng: 126.9861 
//   { name: "중구", lat: 37.5579, lng: 126.9941 
//   { name: "중랑구", lat: 37.5953, lng: 127.0936 
// ];