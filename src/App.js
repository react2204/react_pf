import './scss/style.scss';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Visual from './components/main/Visual';
import Content from './components/main/Content';

function App() {
	return (
		<>
			<Header />
			<Visual />
			<Content />
			<Footer />
		</>
	);
}

export default App;
