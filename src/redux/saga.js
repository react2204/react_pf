import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMember } from './api';

export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
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
export function* returnYoutube() {
	try {
		const response = yield call(getYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}

export function* callMember() {
	yield takeLatest('MEMBER_START', returnMember);
}
export function* returnMember() {
	try {
		const response = yield call(getMember);
		yield put({ type: 'MEMBER_SUCCESS', payload: response.data.data });
	} catch (err) {
		yield put({ type: 'MEMBER_ERROR', payload: err });
	}
}
