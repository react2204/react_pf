//main 컴포넌트
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Vids from './Vids';
import Pics from './Pics';
import Btns from './Btns';
import Anime from '../../class/anim.js';

import { useRef, useEffect, useState } from 'react';

const path = process.env.PUBLIC_URL;

function Main() {
	const main = useRef(null);
	const pos = useRef([]);
	const [index, setIndex] = useState(0);
	//현재 스크롤되는 값을 관리할 state추가
	const [scrolled, setScrolled] = useState(0);

	const getPos = () => {
		const secs = main.current.querySelectorAll('.myScroll');
		pos.current = [];
		for (const sec of secs) pos.current.push(sec.offsetTop);
	};

	const activation = () => {
		const base = -200;
		let scroll = window.scrollY;
		//현재 스크롤되는 거는 값을 scrolled state에 저장
		setScrolled(scroll);
		const btns = main.current.querySelectorAll('.vBtns li');

		pos.current.map((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	useEffect(() => {
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[index],
			duration: 500,
		});
	}, [index]);

	return (
		<main ref={main}>
			<Header type={'main'} logoSrc={`${path}/img/logo1.png`} />
			<Visual />
			<News />
			<Vids scrolled={scrolled} posStart={pos.current[2]} />
			<Pics />
			<Btns setIndex={setIndex} />
		</main>
	);
}

export default Main;
