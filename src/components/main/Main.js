//main 컴포넌트
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Vids from './Vids';
import Pics from './Pics';
import Btns from './Btns';
import Anime from '../../class/anim.js';

const path = process.env.PUBLIC_URL;

function Main() {
  return (
    <main>
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