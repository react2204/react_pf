import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';
import Layout from '../common/Layout';

function Member() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((state) => state.memberReducer.members);
	const dispatch = useDispatch();

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

	const action = setMembers(newMembers);

	return (
		<Layout name={'Member'}>
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
