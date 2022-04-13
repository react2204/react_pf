import Layout from '../common/Layout';
import styled from 'styled-components';

const path = process.env.PUBLIC_URL;

const Box = styled.div`
	width: 100px;
	height: 100px;
	border: 1px solid #333;
	position: relative;

	&::after {
		position: absolute;
		top: 0px;
		left: 0px;
		content: 'test';
		display: block;
		width: 100%;
		height: 100%;
		background-color: aqua;
		background-image: url(${path}/img/member1.jpg);
		background-size: cover;
	}
`;

const LinkBtn = styled.button`
	display: block;
	padding: 10px 20px;
	background: aqua;
	border: none;
	border-raius: 5px;
	color: #fff;
`

function Gallery() {
	return (
		<Layout name={'Gallery'}>
			<Box></Box>
			<LinkBtn>버튼</LinkBtn>
			<div className="box2"></div>
		</Layout>
	);
}

export default Gallery;
