//main 컴포넌트
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Vids from './Vids';
import Pics from './Pics';
import Btns from './Btns';
import Anime from '../../class/anim.js';

import {useRef, useEffect} from 'react';

const path = process.env.PUBLIC_URL;

function Main() {
  //메인컨텐츠 프레임을 참조할 main객체 추가
  const main = useRef(null);
  //세로 위치값이 배열로 참조될 pos객체 추가
  const pos = useRef([]);

  //참조된 main의 자식의 .myScroll요소를 모두 찾은뒤 세로 위치값을 pos(ref)에 옮겨담을 함수를 정의
  const getPos = () => {
    const secs = main.current.querySelectorAll('.myScroll'); 
    pos.current=[];   
    for( const sec of secs) pos.current.push(sec.offsetTop);
    console.log(pos.current);
  }

  //컴포넌트 생성시 getPos호출해서 각 섹션별 세로 위치값 구함
  useEffect(()=>{
    //첨 로딩시 섹션별 세로 위치값 저장
    getPos();

    //브라우저 리사이즈시 세로 위치값 저장
    window.addEventListener('resize', getPos);
    //메인컴포넌트가 사라질떄 window전역에 등록된 getPos 함수 제거
    return () => window.removeEventListener('resize', getPos);
  },[]);

  return (
    <main ref={main}>
      <Header type={'main'} logoSrc={`${path}/img/logo1.png`} />
      <Visual />
      <News />
      <Vids />
      <Pics />
      <Btns />
    </main>
  )
}

export default Main