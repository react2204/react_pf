import React, { useEffect } from 'react';
import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setFlickr } from '../../redux/actions';

function Gallery() {
	//store의 flickrReducer내용을 가져옴
	const { flickr } = useSelector((state) => state.flickrReducer);
	const dispatch = useDispatch();
	console.log(flickr);

	useEffect(() => {
		dispatch(setFlickr(['Orange', 'Melon']));
	}, []);

	return (
		<Layout name={'Gallery'}>
			<h2>Flickr Gallery</h2>
		</Layout>
	);
}

export default Gallery;
