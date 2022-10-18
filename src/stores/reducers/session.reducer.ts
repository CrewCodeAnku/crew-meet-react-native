import {
  LOGOUT,
  SET_AUTHENTICATION_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  VERIFY_EMAIL_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  GET_PROFILE_SUCCESS,
} from '../actions/session.action.type';

const initialState = {
  registrationSuccess: null,
  verifyEmailSuccess: null,
  forgotPasswordSuccess: null,
  resetPasswordSuccess: null,
  getProfileSuccess: null,
  changePasswordSuccess: null,
  emailVerificationSuccess: null,
  userDetails: null,
  currentRole: 'guest',
  token: '',
  otp: '',
  forgotemail: '',
  registeremail: '',
};

export interface sessionState {
  registrationSuccess: any;
  verifyEmailSuccess: any;
  forgotPasswordSuccess: any;
  resetPasswordSuccess: any;
  getProfileSuccess: any;
  changePasswordSuccess: any;
  emailVerificationSuccess: any;
  userDetails: any;
  currentRole: string;
  token: string;
  otp: string;
  forgotemail: string;
  registeremail: string;
}

export default function user(state = initialState, {payload, type}: any) {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registrationError: null,
        registrationSuccess: payload.message,
        otp: payload.otp,
        registeremail: payload.email,
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifyEmailSuccess: payload,
        verifyEmailError: null,
      };
    case SET_AUTHENTICATION_TOKEN:
      //console.log('Token Inside reducer', payload);
      return {
        ...state,
        token: payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginError: null,
        userDetails: payload.data,
        registeremail: payload.email,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        registeremail: payload.email,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordError: null,
        forgotPasswordSuccess: payload.message,
        otp: payload.otp,
        forgotemail: payload.email,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordError: null,
        resetPasswordSuccess: payload,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        getProfileError: null,
        getProfileSuccess: payload,
      };

    case LOGOUT:
      //console.log('Inside logout');
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
