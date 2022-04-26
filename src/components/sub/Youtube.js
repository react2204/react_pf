import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import Popup from '../common/Popup';

function Youtube() {
	const vidData = useSelector((state) => state.youtubeReducer.youtube);
	//기존 데이터를 2개의 배열로 분리복사  (얕은복사)
	const vids1 = vidData.slice(0, 2);
	const vids2 = vidData.slice(2, 5);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	return (
		<>
			<Layout name={'Youtube'} imgSrc={'/img/sub2.jpg'}>
				<ul>
					{/* 첫번째 분리한 배열로는 ul li출력 */}
					{vids1.map((item, idx) => {
						return (
							<li key={idx}>
								<img src={item.snippet.thumbnails.medium.url} />
							</li>
						);
					})}
				</ul>

				{/* 두번째 분리할  배열로는 article출력 */}
				{vids2.map((item, idx) => {
					const desc = item.snippet.description;
					const date = item.snippet.publishedAt;

					return (
						<article
							key={idx}
							onClick={() => {
								//article로는 첫번째 순서이지만
								//데이터로는 3번쨰 순서이므로 기존 idx값에 2를 더함
								//해당 순번은 추후 팝업데이터 호출할때 필요
								setIndex(idx + 2);
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
				{vidData.length !== 0 && (
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
