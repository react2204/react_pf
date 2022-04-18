import Layout from '../common/Layout.js';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Maconry from 'react-masonry-component';

function Masonry() {
  const path = process.env.PUBLIC_URL;
  const getURL = ()=>{
    const key = '89aae050d1d8c006bdb5bf866029199d';
    const method1 = 'flickr.interestingness.getList';
    const method2 = 'flickr.photos.search';
    const num = 500;
    const url1 = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
    const url2 = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=ocean`;
    return [url1, url2];
  }
  const [url1, url2] = getURL();

  const masonryOptions = {    
    transitionDuration: '0.5s'
  };

  const frame = useRef(null);
  const [items, setItems] = useState([]);    
  const [loading, setLoading] = useState(true);
  //모션중 재이벤트 방지를 위하 state추가
  const [enableClick, setEnableClick] = useState(true)
  

  const getFlickr = async (name) =>{  
    await axios.get(name).then((json)=>{    
      setItems(json.data.photos.photo);
    });  

    setTimeout(()=>{
      frame.current.classList.add('on'); 
      setLoading(false); 

      setTimeout(()=>{
        setEnableClick(true);
      },1000);//frame에 on이 붙어서 올라오는 모션동안 재클릭 방지
    },1000); //masonry ui모션이 적용되는 시간동안 지연
          
  }

  useEffect(()=>{
    getFlickr(url1);
  },[]);

  return (
    <Layout name={'Masonry'}>        
      {loading ? <img className='loading' src={path+'/img/loading.gif'} /> : null}

      <button onClick={()=>{ 
        //버튼 클릭시 enableClick값이 true일때만 동작실행
        if(enableClick){
          //조건문 통과하자마자 false로 변경해서 재클릭 방지
          setEnableClick(false);
          setLoading(true);
          frame.current.classList.remove('on');    
          getFlickr(url1);
        }  
        
      }}>interest 갤러리 보기</button>


      <button onClick={()=>{ 
        if(enableClick){
          setEnableClick(false);
          setLoading(true);
          frame.current.classList.remove('on');  
          getFlickr(url2);
        }        
      }}>ocean 갤러리 보기</button>

      <div className="frame" ref={frame}>       
        <Maconry
          elementType={'div'}
          options={masonryOptions}
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
