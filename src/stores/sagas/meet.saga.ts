import {all, put, takeLatest} from 'redux-saga/effects';
import toast from '../../utilities/toast';

import {
  IS_ROOM_EXIST,
  GET_TURN_CREDENTIALS,
  isRoomExistFailure,
  isRoomExistSuccess,
  getTurnCredentialsSuccess,
} from '../actions/meet.action.type';

import httpClient from '../services/http.client';

import * as Effects from 'redux-saga/effects';
const call: any = Effects.call;

function* checkRoomExistsHandler({payload: data}: any) {
  const payload = {
    data,
    method: 'get',
    url: `/socket/room-exists/${data}`,
  };
  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: true,
  });
  if (error) {
    yield put(isRoomExistFailure(false));
  } else if (!result.success) {
    yield put(isRoomExistFailure(false));
    toast.show(result.message);
  } else {
    yield put(isRoomExistSuccess(true));
  }
}

function* getTurnCredentials({payload: data}: any) {
  const payload = {
    data,
    method: 'get',
    url: `/socket/get-turn-credentials`,
  };
  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: true,
  });
  if (error) {
    toast.show(error.message);
  } else if (!result.success) {
    toast.show(result.message);
  } else {
    //console.log('Result', result);
    yield put(getTurnCredentialsSuccess(result.token));
  }
}

function* Meet() {
  yield all([takeLatest(IS_ROOM_EXIST, checkRoomExistsHandler)]);
  yield all([takeLatest(GET_TURN_CREDENTIALS, getTurnCredentials)]);
}

export default Meet;
