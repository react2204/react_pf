import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
  const path = process.env.PUBLIC_URL;
	const container = useRef(null);
	const { kakao } = window;
	const [map, setMap] = useState(null);  
  const [traffic, setTraffic] = useState(false);

	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(37.512714519901536, 127.06064893707484),
			level: 3,
		};

		const mapInfo = new kakao.maps.Map(container.current, options);
		setMap(mapInfo);
    
    const markerPosition  = new kakao.maps.LatLng(37.512714519901536, 127.06064893707484); 

    //마커 이미지 정보 추가
    const imgSrc = `${path}/img/marker1.png`;
    const imgSize = new kakao.maps.Size(232, 99);
    const imgPos = {offset: new kakao.maps.Point(110, 90)};
    const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);


    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImg
    });

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
