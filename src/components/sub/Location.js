import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const container = useRef(null);
	const { kakao } = window;
	//카카오맵 api를 통해서 생성된 인스턴스를 옮겨담을 state추가
	const [map, setMap] = useState({});

	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3,
		};

		const map = new kakao.maps.Map(container.current, options);
		//인스턴스 map을 state map으로 옮겨담음
		setMap(map);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>

      {/* 버튼 클릭시 각각 트래픽정보 on / off */}
			<button
				onClick={() => map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>
				Traffic ON
			</button>
			<button
				onClick={() =>
					map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				}>
				Traffic OFF
			</button>
		</Layout>
	);
}

export default Location;
