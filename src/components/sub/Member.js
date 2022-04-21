import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Member() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((state) => console.log(state));

	return (
		<Layout name={'Member'}>
			{/* <button
				onClick={() => {
					const newMembers = [...members];
					newMembers[0].name = 'Jane';
					setMembers(newMembers);
				}}>
				멤버정보 변경
			</button>

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
			</ul> */}
		</Layout>
	);
}

export default Member;
