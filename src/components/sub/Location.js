import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const container = useRef(null);
	const { kakao } = window;
	const [map, setMap] = useState(null);
  //traffic보기 토글 기능을 위한 state추가
  const [traffic, setTraffic] = useState(false);

	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3,
		};

		const map = new kakao.maps.Map(container.current, options);
		setMap(map);
	}, []);

  //traffic값이 변경될때마다 실행되는 useEffect호출
  useEffect(()=>{
    console.log(traffic);
    handleTraffic();
  }, [traffic]);

  //교통량 표시 함수정의
  const handleTraffic = () => {
    //map state값이 있을때에만 동작되게 조건문처리
    console.log(map);    
    if(map){      
      traffic 
        ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        : map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);        
    }
  }

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>

      {/* 해당 버튼을 클릭할때마다 기존 불린값을 반전시켜 토글기능실행 */}
      <button onClick={()=>setTraffic(!traffic)}>{traffic ? 'Traffic OFF' : 'Traffic On'}</button>      
			
		</Layout>
	);
}

export default Location;
