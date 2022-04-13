import React, {useRef, useEffect} from 'react'
import Layout from '../common/Layout';

function Location() {
  //가상돔을 참조할 container객체를 useRef로 생성
  const container = useRef(null);
  //window전역객체 안에서 kakao라는 객체를 찾은 다음에 kakao라는 변수이름으로 비구조화 할당
  const {kakao} = window;

  useEffect(()=>{   
    const options = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667), 
      level: 3 
    };

    //첫번째 인수로 지도가 들어갈 프레임 등록, 두번째 인수로 지도위치, 줌레벨 옵션값 등록해서 인스턴스 생성
    const map = new kakao.maps.Map(container.current, options); 
  },[]);

  return (
    <Layout name={'Location'}>
      {/* container객체를 해당 가상돔에 참조 */}
      <div id="map" ref={container}></div>
    </Layout>
  )
}

export default Location