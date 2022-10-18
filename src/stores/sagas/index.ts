import {all} from 'redux-saga/effects';
import session from './session.saga';
import meet from './meet.saga';

const sagas = function* sagas() {
  yield all([session(), meet()]);
};

export default sagas;
