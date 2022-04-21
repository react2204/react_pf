import React from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const members = useSelector((state) => console.log(state));
	return (
		<section id='vids' className='myScroll'>
			<h1>Recent Youtube</h1>
		</section>
	);
}

export default Vids;
