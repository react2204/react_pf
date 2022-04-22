import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr } from './api';

//reducer에 미들웨어 적용되어 실행할 함수
export default function* rootSaga() {
	//callFlickr함수를 비동기적으로 호출
	yield all([fork(callFlickr)]);
}

//요청받은 action타입에 따라 함수 호출
export function* callFlickr() {
	//'FLICKR_START'액션타입이 전달되면 두번째 인수의 함수 호출
	yield takeLatest('FLICKR_START', returnFlickr);
}

//action타입에 따라 실행될 generate함수
export function* returnFlickr(action) {
	//api.js의 getFlickr함수에 두번째 인수로 받은 값을 적용해서 호출
	const response = yield call(getFlickr, action.opt);
	//위의 호출결과로 반환된 값을 'FLICKR_SUCCESS'액션타입으로 reducer에 전달
	yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}
