import React, { useEffect, useRef } from 'react';

function Member() {
	const frame = useRef(null);

	useEffect(() => {
		console.log('member 컴포넌트 생성');
		frame.current.classList.remove('on');
		frame.current.classList.add('on');

		return () => {
			console.log('member컴포넌트 소멸');
		};
	}, []);

	return (
		<section className='content member' ref={frame}>
			<figure></figure>
			<div className='inner'>
				<h1>Member</h1>
			</div>
		</section>
	);
}

export default Member;
