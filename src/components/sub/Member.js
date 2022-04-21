import Layout from '../common/Layout';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';

function Member() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((state) => state.memberReducer.members);
	//useDispatch로 부터 action객체를 reducer로 전달해주는 함수를 반환받음
	const dispatch = useDispatch();

	//변경할 새로운 데이터
	const newMembers = [
		{
			name: 'Julia',
			position: 'CEO',
			pic: 'member2.jpg',
		},
		{
			name: 'Paul',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Michael',
			position: 'Designer',
			pic: 'member3.jpg',
		},
		{
			name: 'Emily',
			position: 'Front-end Dev',
			pic: 'member4.jpg',
		},
		{
			name: 'Kim',
			position: 'Back-end Dev',
			pic: 'member5.jpg',
		},
		{
			name: 'Emma',
			position: 'Project Manager',
			pic: 'member6.jpg',
		},
	];

	//해당 데이터를 setMembers의 인수로 넣어서 액션객체 생성
	const action = setMembers(newMembers);

	return (
		<Layout name={'Member'}>
			{/* <button onClick={test}>change</button> */}
			<button onClick={() => dispatch(action)}>수정</button>
			<ul className='memberList'>
				{members.map((member, idx) => {
					return (
						<li key={idx}>
							<img src={`${path}/img/${member.pic}`} />
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Member;
