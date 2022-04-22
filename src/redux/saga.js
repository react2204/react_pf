import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube } from './api';

export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube)]);
}

export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}
export function* returnFlickr(action) {
	try {
		const response = yield call(getFlickr, action.opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}

export function* callYoutube() {
	yield takeLatest('YOUTUBE_START', returnYoutube);
}
export function* returnYoutube(action) {
	try {
		const response = yield call(getYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}
