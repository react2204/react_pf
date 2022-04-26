import React, { useEffect, useRef, useState } from 'react';
const path = process.env.PUBLIC_URL;

function Layout(props) {
	let frame = useRef(null);
	const cursor = useRef(null);
	//const [isCursor, setIsCursor] = useState(false);
	//const [cursorX, setCursorX] = useState(0);
	//const [cursorY, setCursorY] = useState(0);

	const handleMove = (e) => {
		cursor.current.style.left = e.pageX + 'px';
		cursor.current.style.top = e.pageY + 'px';
	};

	useEffect(() => {
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
