import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'Julia',
			position: 'CEO',
			pic: 'member1.jpg',
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
	],
};

const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

const reducers = combineReducers({
	memberReducer,
});

export default reducers;
