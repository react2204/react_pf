import Layout from '../common/Layout.js';
import { useState, useEffect, useRef } from 'react';
//redux-saga hook import
import { useSelector, useDispatch } from 'react-redux';
import Maconry from 'react-masonry-component';
import Popup from '../common/Popup';
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';

function Masonry() {
	const path = process.env.PUBLIC_URL;
	const masonryOptions = {
		transitionDuration: '0.5s',
	};
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [enableClick, setEnableClick] = useState(true);

	//get daga from saga
	const { flickr } = useSelector((state) => state.flickrReducer);
	const dispatch = useDispatch();
	const [opt, setOpt] = useState({ type: 'interest' });

	//로딩바 숨기고 컨텐츠 보이는 함수
	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 1000);
		}, 1000);
	};

	//초기 interest갤러리 보이는 함수
	const initGallery = () => {
		//재클릭 가능 막고 로딩바 보이고 화면 숨김
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');

		//opt값을 변경해서 saga에 새로 데이터 변경요청
		setOpt({ type: 'interest' });
		//로딩바 숨기고 화면 출력
		endLoading();
	};

	//검색 갤러리 보이는 함수
	const searchTag = () => {
		const tag = input.current.value.trim();
		if (!tag) {
			alert('검색어를 입력하세요.');
			return;
		}
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');

		setOpt({ type: 'search', tags: tag });
		input.current.value = '';
		endLoading();
	};

	//opt값이 바뀔때마다 전역의 flickr 데이터 수정해서 전달
	useEffect(() => {
		dispatch({ type: 'FLICKR_START', opt });
		endLoading();
	}, [opt]);

	return (
		<>
			<Layout name={'Masonry'} imgSrc={'/img/sub5.jpg'}>
				{loading ? (
					<img className='loading' src={path + '/img/loading.gif'} />
				) : null}

				<div className='searchBox'>
					<input
						type='text'
						ref={input}
						onKeyUp={(e) => {
							if (e.key === 'Enter') {
								if (enableClick) searchTag();
							}
						}}
					/>
					<button
						onClick={() => {
							if (enableClick) searchTag();
						}}>
						search
					</button>
				</div>

				<button
					onClick={() => {
						if (enableClick) initGallery();
					}}>
					interest 갤러리 보기
				</button>

				<div className='frame' ref={frame}>
					<Maconry elementType={'div'} options={masonryOptions}>
						{flickr.map((item, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										setIndex(idx);
										pop.current.open();
									}}>
									<div className='inner'>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											/>
										</div>
										<h2>{item.title}</h2>
									</div>
								</article>
							);
						})}
					</Maconry>
				</div>
			</Layout>

			<Popup ref={pop}>
				{flickr.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`}
					/>
				)}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Masonry;
