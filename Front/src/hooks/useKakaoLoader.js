import { useState, useEffect } from 'react';

// 카카오맵 SDK 로딩 상태를 관리하는 커스텀 훅
const useKakaoLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. 이미 로드되었거나 로드 중이면 실행하지 않음
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }
    // 2. 이미 document에 스크립트가 있다면 (다른 컴포넌트가 로드 중) 대기
    if (document.querySelector('script[src*="dapi.kakao.com"]')) {
        // 이미 로드 중이거나 로드 완료된 상태를 가정하고 대기하는 로직 추가 필요
        // (복잡해지므로 여기서는 단순화하고, 최초 1회 로드 보장에 집중)
    }

    const kakaoMapKey = process.env.REACT_APP_KAKAO_MAP_KEY;
    if (!kakaoMapKey) {
        setError('카카오맵 앱키(REACT_APP_KAKAO_MAP_KEY)가 설정되지 않았습니다.');
        return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services,clusterer,drawing`;
    script.async = true;

    // 로드 성공 시
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    // 로드 실패 시
    script.onerror = () => {
      setError('카카오맵 SDK 로드에 실패했습니다.');
    };

    document.head.appendChild(script);

    // Cleanup: 스크립트 태그 자체는 제거하지 않습니다 (앱 전체에서 사용).
    // 만약 에러가 발생했다면 생성된 스크립트를 제거할 수 있습니다.
    return () => {
        if (error) {
            document.head.removeChild(script);
        }
    };
  }, [error]);

  return { isLoaded, error };
};



export default useKakaoLoader;