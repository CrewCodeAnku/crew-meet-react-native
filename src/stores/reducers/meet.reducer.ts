import {MediaStream} from 'react-native-webrtc';

import {
  SET_IS_ROOM_HOST,
  SET_CONNECT_ONLY_WITH_AUDIO,
  SET_IDENTITY,
  SET_ROOM_ID,
  SET_SHOW_OVERLAY,
  SET_PARTICIPANTS,
  SET_MESSAGES,
  SET_ACTIVE_CONVERSATION,
  SET_DIRECT_CHAT_HISTORY,
  SET_SOCKET_ID,
  IS_ROOM_EXIST,
  GET_TURN_CREDENTIALS_SUCCESS,
  ADD_STREAM_DATA,
  SET_DATA_TO_INITIAL,
} from '../actions/meet.action.type';

const initialState = {
  identity: '',
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
  showOverlay: true,
  participants: [],
  messages: [],
  activeConversation: null,
  directChatHistory: [],
  streamsdata: [],
  socketId: null,
  isRoomExist: true,
  turnCredentials: null,
};

export interface meetState {
  identity: string;
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  roomId: any;
  showOverlay: boolean;
  participants: never[];
  messages: never[];
  streamsdata: MediaStream[];
  activeConversation: any;
  directChatHistory: never[];
  socketId: any;
  isRoomExist: boolean;
  turnCredentials: any;
}

export default function meet(state = initialState, {payload, type}: any) {
  switch (type) {
    case SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: payload,
      };

    case IS_ROOM_EXIST:
      return {
        ...state,
        isRoomHost: payload,
      };

    case SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: payload,
      };

    case SET_ROOM_ID:
      return {
        ...state,
        roomId: payload,
      };

    case SET_IDENTITY:
      return {
        ...state,
        identity: payload,
      };

    case SET_SHOW_OVERLAY:
      //console.log('Inside set overlay', payload);
      return {
        ...state,
        showOverlay: payload,
      };

    case SET_PARTICIPANTS:
      return {
        ...state,
        participants: payload,
      };

    case SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };

    case SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        activeConversation: payload,
      };

    case SET_DIRECT_CHAT_HISTORY:
      return {
        ...state,
        directChatHistory: payload,
      };

    case SET_SOCKET_ID:
      return {
        ...state,
        socketId: payload,
      };

    case GET_TURN_CREDENTIALS_SUCCESS:
      return {
        ...state,
        turnCredentials: payload,
      };

    case ADD_STREAM_DATA:
      //console.log('Payload', payload);
      return {
        ...state,
        streamsdata: payload,
      };

    case SET_DATA_TO_INITIAL:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
