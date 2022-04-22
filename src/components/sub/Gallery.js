import React, { useEffect, useState, useRef } from 'react';
import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';

function Gallery() {
	const { flickr } = useSelector((state) => state.flickrReducer);
	const dispatch = useDispatch();

	const [opt, setOpt] = useState({ type: 'interest' });
	//input요소 참조
	const input = useRef(null);

	//opt state값이 변경될때마다 saga에 action객체 전달
	useEffect(() => {
		dispatch({ type: 'FLICKR_START', opt });
	}, [opt]);

	//초기화 함수
	const initGallery = () => {
		setOpt({ type: 'interest' });
	};

	//검색함수
	const searchTag = () => {
		const tag = input.current.value;
		setOpt({ type: 'search', tags: tag });
	};

	return (
		<Layout name={'Gallery'}>
			<button onClick={initGallery}>갤러리 초기화</button>

			{/* inputBox 추가 */}
			<div className='inputBox'>
				<input type='text' ref={input} />
				{/* 검색 버튼 클릭시 검색함수 호출 */}
				<button onClick={searchTag}>검색</button>
			</div>

			<ul>
				{flickr.map((item, idx) => {
					return (
						<li key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
									/>
								</div>
								<h2>{item.title}</h2>
							</div>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Gallery;
