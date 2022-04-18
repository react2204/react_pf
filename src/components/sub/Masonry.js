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

  const getFlickr = async (url) =>{  
    await axios.get(url).then((json)=>{
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
