import {createAction} from 'redux-actions';

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = createAction(LOGIN_ERROR);

export const REGISTER = 'REGISTER';
export const register = createAction(REGISTER);

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = createAction(REGISTER_SUCCESS);

export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const verifyEmail = createAction(VERIFY_EMAIL);

export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const verifyEmailSuccess = createAction(VERIFY_EMAIL_SUCCESS);

export const RESEND_VERIFY_EMAIL = 'RESEND_VERIFY_EMAIL';
export const resendVerifyEmail = createAction(RESEND_VERIFY_EMAIL);

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const forgotPassword = createAction(FORGOT_PASSWORD);

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const resetPassword = createAction(RESET_PASSWORD);

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);

export const SET_AUTHENTICATION_TOKEN = 'SET_AUTHENTICATION_TOKEN';
export const setAuthenticationToken = createAction(SET_AUTHENTICATION_TOKEN);

export const GET_PROFILE = 'GET_PROFILE';
export const getProfile = createAction(GET_PROFILE);

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const getProfileSuccess = createAction(GET_PROFILE_SUCCESS);

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfile = createAction(UPDATE_PROFILE);

export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const updateImage = createAction(UPDATE_IMAGE);

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const changePassword = createAction(CHANGE_PASSWORD);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT);
