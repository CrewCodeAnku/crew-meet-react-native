import {call, select, put, delay} from 'redux-saga/effects';
import Idx from 'idx';
import {showLoader, hideLoader} from '../actions/app.action.type';
import {logout} from '../actions/session.action.type';
import axiosInstance from '../../utilities/axios.instance';
import UploadaxiosInstance from '../../utilities/uploadaxios.instance';
import {RootState} from '../reducers';

export const getToken = (state: RootState) => state.session.userDetails.token;

function* HttpClient({
  payload,
  isLoader = true,
  authorization = true,
  image = false,
}: {
  payload?: any;
  isLoader?: boolean;
  authorization?: boolean;
  image?: boolean;
}): any {
  if (isLoader) {
    yield put(showLoader());
    yield delay(250);
  }

  const data = {...payload};
  console.log('Payload Data', data);
  if (authorization) {
    const authToken: RootState = yield select(getToken);
    //console.log('Auth Token inside http client', authToken);
    if (authToken) {
      data.headers = {'x-authorization': authToken};
    } else {
      yield put(hideLoader());
      return {
        error: true,
        result: null,
      };
    }
  }

  try {
    const {data: result} = image
      ? yield call(UploadaxiosInstance, data)
      : yield call(axiosInstance, data);
    yield put(hideLoader());
    return {
      error: null,
      result,
    };
  } catch (error: any) {
    yield put(hideLoader());

    if (Idx(error, _ => _.code)) {
      if (error.code === 'ECONNABORTED') {
        const message = 'Please try later our servers are not responding.';
      } else if (error.code === 401) {
        yield delay(500);
        yield put(logout());
      } else if (error.code === 402) {
      } else {
        /*store.addNotification({
          title: 'Error',
          message: error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });*/
      }
    } else {
      /*store.addNotification({
        title: 'Error',
        message: error.message,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });*/
    }
    return {
      error,
      result: null,
    };
  }
}

export default HttpClient;
