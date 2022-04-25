import React from 'react';

function Btns(props) {
	return (
		<ul className='vBtns'>
			<li className='on' onClick={() => props.setIndex(0)}></li>
			<li onClick={() => props.setIndex(1)}></li>
			<li onClick={() => props.setIndex(2)}></li>
			<li onClick={() => props.setIndex(3)}></li>
		</ul>
	);
}

export default Btns;
