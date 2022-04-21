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

//초기데이터를 state에 저장했다가
//추후 action객체가 전달되면
//action객체의 타입에 따라 기존 데이터를 변경해서 리턴
const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

//전달된 각각의 reducer를 하나도 합쳐서 반환
const reducers = combineReducers({
	memberReducer,
});

export default reducers;

/*
if(action.type) {
  if(action.type==='SET_MEMBERS'){
    return {...state, members: action.payload}
  }
  else{
    return state;
  }
}
*/
