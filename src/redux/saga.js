import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr } from './api';

//reducer에 미들웨어 적용되어 실행할 함수
export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}

//요청받은 action타입에 따라 함수 호출
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//action타입에 따라 실행될 generate함수
export function* returnFlickr(action) {
	console.log(action);
	const response = yield call(getFlickr, action.opt);
	console.log(response);
	yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}
