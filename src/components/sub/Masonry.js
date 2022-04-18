import Layout from '../common/Layout.js';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Maconry from 'react-masonry-component';

function Masonry() {
  const key = '89aae050d1d8c006bdb5bf866029199d';
	const method1 = 'flickr.interestingness.getList';
  const method2 = 'flickr.photos.search';
	const num = 500;
	const url1 = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
  const url2 = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=ocean`;

  //masonry옵션값 설정
  const masonryOptions = { 
    //움직일때의 모션속도
    transitionDuration: '0.5s'
  };

  const frame = useRef(null);
  const [items, setItems] = useState([]);  

  const getFlickr = async (name) =>{  
    await axios.get(name).then((json)=>{
      console.log(json.data.photos.photo);
      setItems(json.data.photos.photo);
    }); 
    frame.current.classList.add('on');        
  }

  useEffect(()=>{
    getFlickr(url1);
  },[]);

  return (
    <Layout name={'Masonry'}>  
      <button onClick={()=>{   
        frame.current.classList.remove('on');
        getFlickr(url1);
      }}>interest 갤러리 보기</button>


      <button onClick={()=>{ 
        frame.current.classList.remove('on');  
        getFlickr(url2);
      }}>ocean 갤러리 보기</button>

      <div className="frame" ref={frame}> 
        {/* 움직일 자식 컴포넌트를 감싸주고 옵션설정 */}
        <Maconry
          elementType={'div'}//wrapping 태그명 지정
          options={masonryOptions} //위에서 설정한 옵션값 적용
        >
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
        </Maconry>
      </div>
    </Layout>
  )
}

export default Masonry
