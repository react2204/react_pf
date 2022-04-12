import React, { useEffect, useRef } from 'react';

function Youtube() {
	let frame = useRef(null);

	useEffect(() => {
		console.log('유튜브 컴포넌트 생성');
		frame.current.classList.add('on');

		return () => {
			console.log('유튜브 컴포넌트 소멸');
		};
	}, []);

	return (
		<section className='content youtube' ref={frame}>
			<figure></figure>
			<div className='inner'>
				<h1>Youtube</h1>
			</div>
		</section>
	);
}

export default Youtube;
