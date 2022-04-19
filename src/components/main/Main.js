//main 컴포넌트
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Vids from './Vids';
import Pics from './Pics';
import Btns from './Btns';
import Anime from '../../class/anim.js';

import {useRef, useEffect, useState} from 'react';

const path = process.env.PUBLIC_URL;

function Main() {  
  const main = useRef(null); 
  const pos = useRef([]);
  const [index, setIndex] = useState(0);
  
  const getPos = () => {
    const secs = main.current.querySelectorAll('.myScroll'); 
    pos.current=[];   
    for( const sec of secs) pos.current.push(sec.offsetTop);   
  }
  
  useEffect(()=>{   
    getPos();
    window.addEventListener('resize', getPos);
    return () => window.removeEventListener('resize', getPos);
  },[]);

  useEffect(()=>{
    //index값이 변경될 때마다 해당 순번의 위치로 스크롤 이동
    new Anime(window, {
      prop: 'scroll',
      value: pos.current[index],
      duration: 500
    })
  },[index]);

  return (
    <main ref={main}>
      <Header type={'main'} logoSrc={`${path}/img/logo1.png`} />
      <Visual />
      <News />
      <Vids />
      <Pics />
      <Btns setIndex={setIndex} />
    </main>
  )
}

export default Main