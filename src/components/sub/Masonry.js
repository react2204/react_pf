import Layout from '../common/Layout.js';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

function Masonry() {
  const key = '89aae050d1d8c006bdb5bf866029199d';
	const method1 = 'flickr.interestingness.getList';
	const num = 20;
	const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
  //gallery frame을 담을 객체 useRef로 생성
  const frame = useRef(null);
  //flickr데이터를 옮겨담을 items state생성
  const [items, setItems] = useState([]);
  

  //async await 구문으로 모든 flickr데이터가 불러온뒤 frame에 on을 붙여서 활성화하는 함수 정의
  const getFlickr = async () =>{
    //axios구문으로 모든 데이터가 불러와지면
    await axios.get(url).then((json)=>{
      console.log(json.data.photos.photo);
      setItems(json.data.photos.photo);
    });

    //동기적으로 frame에 on이 붙어서 화면에 보이는 모션 처리
    frame.current.classList.add('on');        
  }

  //처음 컴포넌트가 생성이 되면 위에 정의한 getFlickr함수 호출
  useEffect(()=>{
    getFlickr();
  },[]);


  return (
    <Layout name={'Masonry'}>
      <div className="frame" ref={frame}>
        {items.map((item,idx)=>{
          return (
            <article key={idx}>
              <div className="inner">
                <div className="pic">
                  <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                </div>
                <h2>{item.title}</h2>
              </div>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default Masonry
