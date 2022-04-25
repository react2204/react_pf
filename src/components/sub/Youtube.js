import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import Popup from '../common/Popup';

function Youtube() {
	const vidData = useSelector((state) => state.youtubeReducer.youtube);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	return (
		<>
			<Layout name={'Youtube'} imgSrc={'/img/sub2.jpg'}>
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
