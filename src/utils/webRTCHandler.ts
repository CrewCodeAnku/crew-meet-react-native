import {
  setShowOverlay,
  setMessages,
  addStreamData,
} from '../stores/actions/meet.action.type';
import * as wss from './wss';
import Peer from 'simple-peer';
import {MediaStream, mediaDevices} from 'react-native-webrtc';
// @ts-ignore
import {fetchTURNCredentials, getTurnIceServers} from './turn';
import {store} from '../../App';
const defaultConstraints = {
  audio: true,
  video: {
    width: '480',
    height: '360',
  },
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

let localStream: any;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost: boolean | undefined,
  identity: string | undefined,
  roomId = null,
  onlyAudio: boolean | undefined,
) => {
  await fetchTURNCredentials();

  const constraints: any = onlyAudio
    ? onlyAudioConstraints
    : defaultConstraints;

  mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      console.log('successfuly received local stream');
      localStream = stream;
      showLocalVideoPreview(localStream);

      // dispatch an action to hide overlay
      store.dispatch(setShowOverlay(false));

      isRoomHost
        ? wss.createNewRoom(identity, onlyAudio)
        : wss.joinRoom(identity, roomId, onlyAudio);
    })
    .catch((err: any) => {
      console.log(
        'error occurred when trying to get an access to local stream',
      );
      console.log(err);
    });
};

let peers: any = {};
let streams: any[] = [];

const getConfiguration = () => {
  const turnIceServers = getTurnIceServers();

  if (turnIceServers) {
    console.log('Inside configuration twillio');
    return {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        ...turnIceServers,
      ],
    };
  } else {
    console.warn('Using only STUN server');
    return {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
  }
};

const messengerChannel = 'messenger';

export const prepareNewPeerConnection = (
  connUserSocketId: string | number,
  isInitiator: boolean,
) => {
  console.log(
    'Inside preparing new peer connection with initiator',
    connUserSocketId,
    isInitiator,
    localStream,
    messengerChannel,
  );
  const configuration = getConfiguration();

  console.log('Got the twillio configuration');

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
    channelName: messengerChannel,
  });

  //console.log('Peers', peers);

  peers[connUserSocketId].on('signal', (data: any) => {
    // webRTC offer, webRTC Answer (SDP informations), ice candidates

    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (stream: MediaStream) => {
    //console.log('new stream came');

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });

  peers[connUserSocketId].on('data', (data: string) => {
    const messageData = JSON.parse(data);
    appendNewMessage(messageData);
  });
};

export const handleSignalingData = (data: {
  connUserSocketId: string | number;
  signal: any;
}) => {
  console.log('Peers', peers);
  //add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data: {socketId: any}) => {
  /*const {socketId} = data;
  const videoContainer: any = document.getElementById(socketId);
  const videoEl: any = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    const tracks = videoEl?.srcObject.getTracks();

    tracks.forEach((t: {stop: () => any}) => t.stop());

    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);

    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }*/
};

////////////////////////////////// UI Videos //////////////////////////////////
const showLocalVideoPreview = (stream: any) => {
  let streams = store.getState().meet.streamsdata as unknown as MediaStream[];
  store.dispatch(
    addStreamData([
      ...(streams as unknown as MediaStream[]),
      stream as MediaStream,
    ]),
  );
};

const addStream = (stream: any, connUserSocketId: string | number) => {
  let streams = store.getState().meet.streamsdata;
  store.dispatch(addStreamData([...streams, {streamvideo: stream}]));
};

/*const getAudioOnlyLabel = (identity = '') => {
  const labelContainer = document.createElement('div');
  labelContainer.classList.add('label_only_audio_container');

  const label = document.createElement('p');
  label.classList.add('label_only_audio_text');
  label.innerHTML = `Only audio ${identity}`;

  labelContainer.appendChild(label);
  return labelContainer;
};*/

////////////////////////////////// Buttons logic //////////////////////////////////

export const toggleMic = (isMuted: boolean) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled: boolean) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const switchCamera = () => {
  localStream.getVideoTracks().forEach((track: any) => {
    console.log('sc', track);
    track._switchCamera();
  });
};

export const endCall = () => {
  wss.disconnect();
};

export const toggleScreenShare = (
  isScreenSharingActive: boolean,
  screenSharingStream = null,
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};

const switchVideoTracks = (
  stream: {
    getTracks: () => {(): any; new (): any; [x: string]: {kind: any}};
  } | null,
) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream?.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream?.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream?.getTracks()[index2],
            peers[socket_id].streams[0],
          );
          break;
        }
      }
    }
  }
};

////////////////////////////////// Messages /////////////////////////////////////
const appendNewMessage = (messageData: {
  content: any;
  identity: any;
  messageCreatedByMe: boolean;
}) => {
  const messages = store.getState().meet.messages;
  store.dispatch(setMessages([...messages, messageData]));
};

export const sendMessageUsingDataChannel = (messageContent: string) => {
  // append this message locally
  const identity = store.getState().meet.identity;

  const localMessageData = {
    content: messageContent,
    date: new Date(),
    identity,
    messageCreatedByMe: true,
  };

  appendNewMessage(localMessageData);

  const messageData = {
    content: messageContent,
    identity,
  };

  const stringifiedMessageData = JSON.stringify(messageData);
  for (let socketId in peers) {
    peers[socketId].send(stringifiedMessageData);
  }
};
