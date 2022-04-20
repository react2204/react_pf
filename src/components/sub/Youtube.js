import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Popup from '../common/Popup';

function Youtube() {
	const pop = useRef(null);
	const key = 'AIzaSyBZFBuapkASPcRBXB2-d_ak5-ecCpVicI4';
	const num = 5;
	const id = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${id}`;

	const [items, setItems] = useState([]);	
	const [index, setIndex] = useState(0);
	//데이터 로딩에 관련한 state추가
	const [loading, setLoading] = useState(false);

	useEffect(() => {	
		axios.get(url).then((json) => {
			console.log(json.data.items);
			setItems(json.data.items);
			//모든 데이터가 호출되고 state값에 담기면 loding state값 true로 변경
			setLoading(true);
		});
	}, []);	

	return (
		<>
			<Layout name={'Youtube'}>				
				
				{items.map((item, idx) => {
					const desc = item.snippet.description;
					const date = item.snippet.publishedAt;

					return (				
						<article key={idx} onClick={()=>{						
							setIndex(idx);
							pop.current.open();
						}}>
							<img src={item.snippet.thumbnails.medium.url} />
							<h2>{item.snippet.title}</h2>
							<p>{desc.length > 150 ? desc.substr(0, 150) + '...' : desc}</p>
							<span>{date.split('T')[0]}</span>
						</article>
					);
				})}
			</Layout>			
			
			<Popup ref={pop}>	
				{/*loading이 true일떄 팝업안에 유튜브 데이터 출력*/}
				{loading && (
					<iframe src={'https://www.youtube.com/embed/'+items[index].snippet.resourceId.videoId} frameBorder="0"></iframe>
				)}	
				<span onClick={()=>pop.current.close()}>close</span>
			</Popup>
		
		</>
	);
}

export default Youtube;
