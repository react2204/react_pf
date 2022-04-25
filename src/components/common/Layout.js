import React, { useEffect, useRef } from 'react';
const path = process.env.PUBLIC_URL;

function Layout(props) {
	let frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${props.name}`} ref={frame}>
			<figure>
				<img src={`${path}${props.imgSrc}`} />
			</figure>

			<div className='inner'>
				<h1>{props.name}</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
