import {all, put, takeLatest} from 'redux-saga/effects';
import {
  LOGIN,
  loginSuccess,
  REGISTER,
  registerSuccess,
  VERIFY_EMAIL,
  verifyEmailSuccess,
  FORGOT_PASSWORD,
  forgotPasswordSuccess,
  setAuthenticationToken,
  GET_PROFILE,
  getProfileSuccess,
  RESET_PASSWORD,
  UPDATE_PROFILE,
  UPDATE_IMAGE,
  CHANGE_PASSWORD,
  RESEND_VERIFY_EMAIL,
  loginError,
} from '../actions/session.action.type';
import httpClient from '../services/http.client';
import * as Effects from 'redux-saga/effects';
import toast from '../../utilities/toast';
import {Platform} from 'react-native';
const call: any = Effects.call;

function* registerHandler({payload: {data, callback}}: any) {
  console.log('Data', data);
  const payload = {
    data,
    method: 'post',
    url: 'signup',
  };
  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: false,
  });
  if (error) {
    if (callback) callback({success: false, data: null});
    if (error.message) {
      toast.show(error.message);
    } else {
      toast.show('Error occured: Something went wrong');
    }
  } else if (!result.success) {
    if (callback) callback({success: false, data: null});
    toast.show(result.message);
  } else {
    toast.show(result.message);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    yield put(
      registerSuccess({
        message: result.message,
        otp: randomNumber,
        email: data.email,
      }),
    );
    if (callback) callback({success: true, data: null});
  }
}

function* verifyEmailHandler({payload: {data, callback}}: any) {
  const payload = {
    data,
    method: 'post',
    url: 'verifyemail',
  };

  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: false,
  });

  if (error) {
    if (error.message) {
      toast.show(error.message);
    } else {
      toast.show('Error occured: Something went wrong');
    }
  } else {
    if (!result.success) {
      if (callback) callback({success: false, data: null});
      toast.show(result.message);
      /*yield put(verifyEmailFailure(result.message));*/
    } else {
      toast.show(result.message);
      yield put(verifyEmailSuccess(result.message));
      if (callback) callback({success: true, data: null});
    }
  }
}

function* resendOtpHandler({payload: {data, callback}}: any) {
  const payload = {
    data,
    method: 'post',
    url: 'resendotp',
  };

  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: false,
  });

  if (error) {
    if (error.message) {
      toast.show(error.message);
    } else {
      toast.show('Error occured: Something went wrong');
    }
  } else {
    if (!result.success) {
      if (callback) callback({success: false, data: null});
      toast.show(result.message);
      /*yield put(verifyEmailFailure(result.message));*/
    } else {
      toast.show(result.message);
      //yield put(verifyEmailSuccess(result.message));
      if (callback) callback({success: true, data: null});
    }
  }
}

function* resetPasswordHandler({payload: {data, callback}}: any) {
  const payload = {
    data,
    method: 'post',
    url: 'resetpassword',
  };
  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: false,
  });
  if (error) {
    if (callback) callback({success: false, data: null});
    if (error.message) {
      toast.show(error.message);
    } else {
      toast.show('Something went wrong!');
    }
  } else {
    if (!result.success) {
      if (callback) callback({success: false, data: null});
      toast.show(result.message);
    } else {
      if (callback) callback({success: true, data: null});
      toast.show(result.message);
    }
  }
}

function* forgotPasswordHandler({payload: {data, callback}}: any) {
  const payload = {
    data,
    method: 'post',
    url: 'forgetpassword',
  };

  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: false,
  });

  if (error) {
    console.log('Error', error);
    if (callback) callback({success: false, data: null});
    if (error.message) {
      toast.show(error.message);
    } else {
      toast.show('Something went wrong!');
    }
  } else {
    if (!result.success) {
      if (callback) callback({success: false, data: null});
      toast.show(result.message);
    } else {
      if (callback) callback({success: true, data: null});
      yield put(
        forgotPasswordSuccess({
          otp: data.otp,
          email: data.email,
          message: result.message,
        }),
      );
    }
  }
}

function* login({payload: {data, callback}}: any) {
  const payload = {
    data: {
      ...data,
    },
    method: 'post',
    url: 'login',
  };

  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: false,
  });

  if (error) {
    if (error.code === 402) {
      const errorDetail = {
        code: error.code,
        ...JSON.parse(error.message),
      };
      if (callback) callback({success: false, data: errorDetail});
      toast.show('Something went wrong!');
    } else if (error.code === 400) {
      console.log('Error', error);
      yield put(loginError({email: data.email}));
      if (callback)
        callback({success: false, data: null, emailVerified: false});
      toast.show(error.message);
    } else {
      toast.show(error.message);
    }
  } else if (!result.success) {
    if (callback) callback({success: false, data: null});
    toast.show(result.message);
  } else {
    if (callback)
      callback({
        success: true,
        data: null,
        emailVerified: result.data.emailVerified,
      });
    if (result.data.emailVerified) {
      yield put(setAuthenticationToken(result.data?.token));
      yield put(loginSuccess({data: result.data, email: result.data?.email}));
    }
  }
}

function* getProfile() {
  const payload = {
    method: 'get',
    url: `/profile`,
  };
  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: true,
  });
  if (error) {
    if (error.message) {
      toast.show(error.message);
    } else {
      toast.show('Something went wrong!');
    }
  } else if (!result.success) {
    toast.show(result.message);
  } else {
    yield put(getProfileSuccess(result.data));
  }
}

function* updateImage({payload: {image, callback}}: any) {
  const localUri = image.path.replace('file://', '');
  const filename = localUri.split('/').pop();
  const formdata = new FormData();

  formdata.append('image', {
    height: image.height,
    width: image.width,
    uri: image.path,
    type: image.mime,
    name: filename,
  });

  const payload = {
    data: formdata,
    method: 'post',
    url: 'updateimage',
  };

  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: true,
    image: true,
  });

  if (error) {
    console.log('Error', error);
    if (error.message) {
      toast.show(error.message);
    } else {
      toast.show('Something went wrong!');
    }
  } else if (!result.success) {
    toast.show(result.message);
    if (callback)
      callback({
        success: false,
        data: null,
      });
  } else {
    console.log('Result', result);
    if (callback)
      callback({
        success: true,
        data: null,
      });
    yield put(loginSuccess(result.data));
  }
}

function* updateProfile({payload: {data, callback}}: any) {
  const payload = {
    data: {
      ...data,
    },
    method: 'post',
    url: 'profile',
  };

  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: true,
  });

  console.log('Result', result);

  if (error) {
    if (error.message) {
      toast.show(error.message);
    } else {
      console.log('Error', error);
      toast.show('Something went wrong!');
    }
    if (callback) callback({success: false, data: null});
  } else if (!result.success) {
    if (callback) callback({success: false, data: null});
    toast.show(result.message);
  } else {
    yield put(loginSuccess({data: result.data, email: result.data?.email}));
    if (callback) callback({success: true, data: null});
    toast.show(result.message);
  }
}

function* changePassword({payload: {data, callback}}: any) {
  const payload = {
    data: {
      ...data,
    },
    method: 'post',
    url: 'changepassword',
  };

  const {error, result} = yield call(httpClient, {
    payload: payload,
    isLoader: true,
    authorization: true,
  });

  if (error) {
    if (error.message) {
      toast.show(error.message);
    } else {
      console.log('Error', error);
      toast.show('Something went wrong!');
    }
    if (callback) callback({success: false, data: null});
  } else if (!result.success) {
    if (callback) callback({success: false, data: null});
    toast.show(result.message);
  } else {
    if (callback) callback({success: true, data: null});
    toast.show(result.message);
  }
}

function* User() {
  yield all([
    takeLatest(LOGIN, login),
    takeLatest(REGISTER, registerHandler),
    takeLatest(FORGOT_PASSWORD, forgotPasswordHandler),
    takeLatest(RESET_PASSWORD, resetPasswordHandler),
    takeLatest(VERIFY_EMAIL, verifyEmailHandler),
    takeLatest(RESEND_VERIFY_EMAIL, resendOtpHandler),
    takeLatest(GET_PROFILE, getProfile),
    takeLatest(UPDATE_PROFILE, updateProfile),
    takeLatest(UPDATE_IMAGE, updateImage),
    takeLatest(CHANGE_PASSWORD, changePassword),
  ]);
}

export default User;
