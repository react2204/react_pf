import React, { useEffect, useRef } from 'react';

function Layout(props) {
	let frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section
			className={`content ${props.name}`}
			ref={frame}	>	

			<figure>
				{/* subText prop값이 있을때에만 해당 값을 출력 */}
				{props.subText ? <h2>{props.subText}</h2> : null}
			</figure>
			
			<div className='inner'>
				<h1>{props.name}</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
