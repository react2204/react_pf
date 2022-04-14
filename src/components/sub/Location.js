import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
  const path = process.env.PUBLIC_URL;
	const container = useRef(null);
	const { kakao } = window;

  //각 지점별 정보값을 배열로 그룹핑
  const info = [
    {
      title: '삼성동 코엑스',
      latlng: new kakao.maps.LatLng(37.512714519901536, 127.06064893707484),
      imgSrc: `${path}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: {offset: new kakao.maps.Point(110, 90)}
    },
    {
      title: '광화문 정문',
      latlng: new kakao.maps.LatLng(37.57599374423426, 126.97686384130986),
      imgSrc: `${path}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: {offset: new kakao.maps.Point(110, 90)}
    },
    {
      title: '남산 타워',
      latlng: new kakao.maps.LatLng(37.55163472770302, 126.98815135296329),
      imgSrc: `${path}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: {offset: new kakao.maps.Point(110, 90)}
    },
  ];

	const [map, setMap] = useState(null);  
  const [traffic, setTraffic] = useState(false);
  const [mapInfo, setMapInfo] = useState(info);

	useEffect(() => {

    //위치 정보값을 객체로 받아 화면에 지도표시 인스턴스 생성
		const options = {
			center: mapInfo[2].latlng,
			level: 3,
		};
		const mapInstance = new kakao.maps.Map(container.current, options);		
    
    //마커 위치, 마커이미지 정보값을 객체로 받아서 마커표시 인스턴스 생성
    const markerPosition  = mapInfo[2].latlng;     
    const imgSrc = mapInfo[2].imgSrc;
    const imgSize = mapInfo[2].imgSize;
    const imgPos = mapInfo[2].imgPos;
    const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);    
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImg
    });

    //해당 지도인스턴에스 마커를 세팅
    marker.setMap(mapInstance);

    //지도 인스턴스를 최종적으로 map 스테이트에 저장
    setMap(mapInstance);
	}, []);


  useEffect(()=>{
    console.log(traffic);
    handleTraffic();
  }, [traffic]);

  
  const handleTraffic = () => {          
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
