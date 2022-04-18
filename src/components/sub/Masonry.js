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
      갤러리 메이슨리 플러그인 적용버전
    </Layout>
  )
}

export default Masonry
