import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
const path = process.env.PUBLIC_URL;

function Gallery() {
	const key = '89aae050d1d8c006bdb5bf866029199d';
	const method1 = 'flickr.interestingness.getList';
	const num = 5;
	const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;

	const [items, setItems] = useState([]);

	useEffect(()=>{
		axios.get(url).then((json)=>{
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		})
	},[]);

	return (
		<Layout name={'Gallery'}>
			<ul>
				{items.map((item,idx)=>{
					return (
						<li key={idx}>list</li>
					)
				})}
			</ul>
		</Layout>
	);
}

export default Gallery;
