import io from 'socket.io-client';
import {
  setRoomId,
  setParticipants,
  setSocketId,
} from '../stores/actions/meet.action.type';
import * as webRTCHandler from './webRTCHandler';
import {appendNewMessageToChatHistory} from './directMessages';
import {store} from '../../App';
import {API_URL} from '@env';

let socket: any = null;

export const connectWithSocketIOServer = () => {
  console.log(API_URL);
  socket = io(API_URL);

  socket.on('connect', () => {
    console.log('successfully connected with socket io server');
    console.log(socket.id);
    store.dispatch(setSocketId(socket.id));
  });

  socket.on('room-id', (data: any) => {
    //console.log('Inside room id', data);
    const {roomId} = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on('room-update', (data: any) => {
    const {connectedUsers} = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on('conn-prepare', (data: any) => {
    const {connUserSocketId} = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    // inform the user which just join the room that we have prepared for incoming connection
    socket.emit('conn-init', {connUserSocketId: connUserSocketId});
  });

  socket.on('conn-signal', (data: any) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on('conn-init', (data: any) => {
    const {connUserSocketId} = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on('user-disconnected', (data: any) => {
    webRTCHandler.removePeerConnection(data);
  });

  socket.on('direct-message', (data: any) => {
    appendNewMessageToChatHistory(data);
  });
};

export const createNewRoom = (identity?: string, onlyAudio?: boolean) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
    onlyAudio,
  };

  //console.log('Socket', socket);
  socket.emit('create-new-room', data);
};

export const disconnect = () => {
  socket.disconnect();
};

export const joinRoom = (
  identity?: string,
  roomId?: string | null,
  onlyAudio?: boolean,
) => {
  //emit an event to server that we would to join a room
  const data = {
    roomId,
    identity,
    onlyAudio,
  };

  socket.emit('join-room', data);
};

export const signalPeerData = (data: any) => {
  console.log('Inside signaling peer data', data);
  socket.emit('conn-signal', data);
};

export const sendDirectMessage = (data: any) => {
  socket.emit('direct-message', data);
};
