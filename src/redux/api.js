import axios from 'axios';
const path = process.env.PUBLIC_URL;

export const getMember = async () => {
	const url = path + '/DB/member.json';
	return await axios.get(url);
};

export const getFlickr = async (opt) => {
	const key = '89aae050d1d8c006bdb5bf866029199d';
	const method1 = 'flickr.interestingness.getList';
	const method2 = 'flickr.photos.search';
	const num = 50;
	let url = '';

	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
	}

	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
	}

	return await axios.get(url);
};

export const getYoutube = async () => {
	const key = 'AIzaSyBZFBuapkASPcRBXB2-d_ak5-ecCpVicI4';
	const num = 5;
	const id = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${id}`;

	return await axios.get(url);
};
