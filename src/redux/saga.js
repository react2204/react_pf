import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMember } from './api';
import * as types from './actionType';
import { type } from '@testing-library/user-event/dist/type';

export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
}

export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
export function* returnFlickr(action) {
	try {
		const response = yield call(getFlickr, action.opt);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: type.FLICKR.error, payload: err });
	}
}

export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}
export function* returnYoutube() {
	try {
		const response = yield call(getYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.error, payload: err });
	}
}

export function* callMember() {
	yield takeLatest(types.MEMBER.start, returnMember);
}
export function* returnMember() {
	try {
		const response = yield call(getMember);
		yield put({ type: types.MEMBER.success, payload: response.data.data });
	} catch (err) {
		yield put({ type: types.MEMBER.error, payload: err });
	}
}
