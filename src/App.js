import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './scss/style.scss';
//common 컴포넌트
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main 컴포넌트
import Main from './components/main/Main';

//sub 컴포넌트
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Masonry from './components/sub/Masonry';
import Member from './components/sub/Member';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Community from './components/sub/Community';
import { useEffect } from 'react';

const path = process.env.PUBLIC_URL;

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'MEMBER_START' });
		dispatch({ type: 'YOUTUBE_START' });
		dispatch({ type: 'FLICKR_START', opt: { type: 'interest' } });
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Main />
				</Route>

				<Route path='/'>
					<Header type={'sub'} logoSrc={`${path}/img/logo2.png`} />
				</Route>
			</Switch>

			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/masonry' component={Masonry} />
			<Route path='/member' component={Member} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />
			<Route path='/community' component={Community} />

			<Footer />
		</>
	);
}

export default App;
