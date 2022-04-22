import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr } from './api';

export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}

export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

export function* returnFlickr(action) {
	try {
		const response = yield call(getFlickr, action.opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		//해당 api호출이 실패했을때 예외처리
		//에러내용을 reducer에 전달
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}
