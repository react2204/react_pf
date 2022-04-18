import Layout from '../common/Layout.js';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Masonry() {
  const key = '89aae050d1d8c006bdb5bf866029199d';
	const method1 = 'flickr.interestingness.getList';
	const num = 20;
	const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;

  const [items, setItems] = useState([]);

  useEffect(()=>{
    axios.get(url).then((json)=>{
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		})
  },[]);

  return (
    <Layout name={'Masonry'}>
      <div className="frame on">
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
