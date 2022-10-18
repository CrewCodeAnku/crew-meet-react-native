import {createAction} from 'redux-actions';

export const SET_IS_ROOM_HOST = 'SET_IS_ROOM_HOST';
export const setIsRoomHost = createAction(SET_IS_ROOM_HOST);

export const SET_CONNECT_ONLY_WITH_AUDIO = 'SET_CONNECT_ONLY_WITH_AUDIO';
export const setConnectOnlyWithAudio = createAction(
  SET_CONNECT_ONLY_WITH_AUDIO,
);

export const SET_IDENTITY = 'SET_IDENTITY';
export const setIdentity = createAction(SET_IDENTITY);

export const SET_ROOM_ID = 'SET_ROOM_ID';
export const setRoomId = createAction(SET_ROOM_ID);

export const SET_SHOW_OVERLAY = 'SET_SHOW_OVERLAY';
export const setShowOverlay = createAction(SET_SHOW_OVERLAY);

export const SET_PARTICIPANTS = 'SET_PARTICIPANTS';
export const setParticipants = createAction(SET_PARTICIPANTS);

export const SET_MESSAGES = 'SET_MESSAGES';
export const setMessages = createAction(SET_MESSAGES);

export const SET_ACTIVE_CONVERSATION = 'SET_ACTIVE_CONVERSATION';
export const setActiveConversation = createAction(SET_ACTIVE_CONVERSATION);

export const SET_DIRECT_CHAT_HISTORY = 'SET_DIRECT_CHAT_HISTORY';
export const setDirectChatHistory = createAction(SET_DIRECT_CHAT_HISTORY);

export const SET_SOCKET_ID = 'SET_SOCKET_ID';
export const setSocketId = createAction(SET_SOCKET_ID);

export const IS_ROOM_EXIST = 'IS_ROOM_EXIST';
export const isRoomExistAction = createAction(IS_ROOM_EXIST);

export const IS_ROOM_EXIST_FAILURE = 'IS_ROOM_EXIST_FAILURE';
export const isRoomExistFailure = createAction(IS_ROOM_EXIST_FAILURE);

export const IS_ROOM_EXIST_SUCCESS = 'IS_ROOM_EXIST_SUCCESS';
export const isRoomExistSuccess = createAction(IS_ROOM_EXIST_SUCCESS);

export const ADD_STREAM_DATA = 'ADD_STREAM_DATA';
export const addStreamData = createAction(ADD_STREAM_DATA);

export const GET_TURN_CREDENTIALS = 'GET_TURN_CREDENTIALS';
export const getTurnCredentials = createAction(GET_TURN_CREDENTIALS);

export const GET_TURN_CREDENTIALS_SUCCESS = 'GET_TURN_CREDENTIALS_SUCCESS';
export const getTurnCredentialsSuccess = createAction(
  GET_TURN_CREDENTIALS_SUCCESS,
);

export const SET_DATA_TO_INITIAL = 'SET_DATA_TO_INITIAL';
export const setDataToInitial = createAction(SET_DATA_TO_INITIAL);
