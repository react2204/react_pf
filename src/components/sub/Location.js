import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const container = useRef(null);
	const { kakao } = window;
	const [map, setMap] = useState({});
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
  }, [traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>

      {/* 해당 버튼을 클릭할때마다 기존 불린값을 반전시켜 토글기능실행 */}
      <button onClick={()=>setTraffic(!traffic)}>{traffic ? 'Traffic OFF' : 'Traffic On'}</button>      
			
		</Layout>
	);
}

export default Location;
