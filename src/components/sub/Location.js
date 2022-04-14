import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const container = useRef(null);
	const { kakao } = window;
	const [map, setMap] = useState(null);  
  const [traffic, setTraffic] = useState(false);

	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(37.512742, 127.060810),
			level: 3,
		};

		const mapInfo = new kakao.maps.Map(container.current, options);
		setMap(mapInfo);

    //마커 위치 인스턴스 생성
    const markerPosition  = new kakao.maps.LatLng(37.512742, 127.060810); 

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(mapInfo);
	}, []);

 
  useEffect(()=>{
    console.log(traffic);
    handleTraffic();
  }, [traffic]);

  
  const handleTraffic = () => {   
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
      <button onClick={()=>setTraffic(!traffic)}>{traffic ? 'Traffic OFF' : 'Traffic On'}</button>  
		</Layout>
	);
}

export default Location;
