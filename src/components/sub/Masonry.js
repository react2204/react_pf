import Layout from '../common/Layout.js';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

function Masonry() {
  const key = '89aae050d1d8c006bdb5bf866029199d';
	const method1 = 'flickr.interestingness.getList';
  const method2 = 'flickr.photos.search';
	const num = 20;
	const url1 = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
  const url2 = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=ocean`;
  const frame = useRef(null);
  const [items, setItems] = useState([]);  

  //getFlickr함수에 원하는 주소값을 전달할수 있도록 name 이라는 매개변수 추가
  const getFlickr = async (name) =>{  
    await axios.get(name).then((json)=>{
      console.log(json.data.photos.photo);
      setItems(json.data.photos.photo);
    }); 
    frame.current.classList.add('on');        
  }

  useEffect(()=>{
    //처음 로딩시 name매개변수에 url1이라는 주소값을 넣어서 데이터 호출
    //처음 로딩시 interestingness의 데이터 출력
    getFlickr(url1);
  },[]);

  return (
    <Layout name={'Masonry'}>
      {/* interestingness데이터 보여주는 버튼 이벤트 */}
      <button onClick={()=>{
        //기존 갤러리를 아래로 내리면서 사라지는 모션처리
        frame.current.classList.remove('on');
        //url1을 인수로 집어넣어서 interest갤러리를 화면에 호출
        getFlickr(url1);
      }}>interest 갤러리 보기</button>

      {/* ocean키워드의 데이터 보여주는 버튼 이벤트 */}
      <button onClick={()=>{
        //기존 갤러리를 아래로 내리면서 사라지는 모션처리
        frame.current.classList.remove('on');
        //url2를 인수로 집어넣어서 ocean키워드의 갤러리를 화면에 호출
        getFlickr(url2);
      }}>ocean 갤러리 보기</button>

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
