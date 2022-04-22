import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';

function Gallery() {
	const { flickr } = useSelector((state) => state.flickrReducer);
	const dispatch = useDispatch();

	const [opt, setOpt] = useState({ type: 'interest' });

	useEffect(() => {
		//action객체를 saga.js로 전달
		dispatch({ type: 'FLICKR_START', opt });
	}, [opt]);

	return (
		<Layout name={'Gallery'}>
			<h2>Flickr Gallery</h2>
			{flickr.map((item, idx) => {
				return <li key={idx}>{item.title}</li>;
			})}
		</Layout>
	);
}

export default Gallery;
