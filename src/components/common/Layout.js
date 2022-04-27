import React, { useEffect, useRef } from 'react';

function Layout(props) {
	let frame = useRef(null);
	const cursor = useRef(null);
	let isCursor = false;

	const handleMove = (e) => {
		if (isCursor) {
			console.log('move');
			cursor.current.style.left = e.clientX + 'px';
			cursor.current.style.top = e.clientY + 'px';
		}
	};

	useEffect(() => {
		//서브페이지 비주얼 영역에서 마우스가 벗어나면 커서 사라지게 이벤트 처리

		const figure = frame.current.querySelector('figure');
		figure.addEventListener('mouseenter', () => {
			isCursor = true;
			cursor.current.style.display = 'block';
		});
		figure.addEventListener('mouseleave', () => {
			isCursor = false;
			cursor.current.style.display = 'none';
		});

		frame.current.classList.add('on');
		window.addEventListener('mousemove', handleMove);

		return () => window.removeEventListener('mousemove', handleMove);
	}, []);

	return (
		<section className={`content ${props.name}`} ref={frame}>
			<figure>
				{/* <img src={`${path}${props.imgSrc}`} /> */}
				<h1>{props.name}</h1>
				<div className='cursor' ref={cursor}></div>
			</figure>

			<div className='inner'>
				<h1>{props.name}</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
