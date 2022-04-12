import React, { useEffect, useRef } from 'react';

function Gallery() {
	let frame = useRef(null);

	useEffect(() => {
		console.log('갤러리 컴포넌트 생성');
		frame.current.classList.add('on');

		return () => {
			console.log('갤러리 컴포넌트 소멸');
		};
	}, []);

	return (
		<section className='content gallery' ref={frame}>
			<figure></figure>

			<div className='inner'>
				<h1>Gallery</h1>
			</div>
		</section>
	);
}

export default Gallery;
