import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from '../common/Popup';
import { setYoutube } from '../../redux/actions';

function Youtube() {
	//store에 youtubeReducer데이터 가져옴 (빈배열)
	const vidData = useSelector((state) => state.youtubeReducer.youtube);
	//dispatch전송함수 활성화
	const dispatch = useDispatch();

	const pop = useRef(null);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	//axios 데이터 호출 구문을 함수로 정의
	const fetchYoutube = async () => {
		const key = 'AIzaSyBZFBuapkASPcRBXB2-d_ak5-ecCpVicI4';
		const num = 5;
		const id = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${id}`;

		//해당함수에서 axios가 유튜브 데이터를 받아오면
		await axios.get(url).then((json) => {
			//받아온 정보값을 dispatch함수로 다시 reducer에 전달
			dispatch(setYoutube(json.data.items));
			setLoading(true);
		});
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{/* reducer를 통해 store로 부터 전달받은 vidData로 리스트 출력 */}
				{vidData.map((item, idx) => {
					const desc = item.snippet.description;
					const date = item.snippet.publishedAt;

					return (
						<article
							key={idx}
							onClick={() => {
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
				{loading && (
					<iframe
						src={
							'https://www.youtube.com/embed/' +
							vidData[index].snippet.resourceId.videoId
						}
						frameBorder='0'></iframe>
				)}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Youtube;
