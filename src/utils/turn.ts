import {getTurnCredentials} from '../stores/actions/meet.action.type';
import {store} from '../../App';

let TURNIceServers: any = null;

export const fetchTURNCredentials = async () => {
  await store.dispatch(getTurnCredentials());
  const responseData = await store.getState().meet.turnCredentials;

  if (responseData && responseData.token && responseData.token?.iceServers) {
    console.log('Twillio token', responseData.token?.iceServers);
    TURNIceServers = responseData.token.iceServers;
  }

  return TURNIceServers;
};

export const getTurnIceServers = () => {
  return store.getState().meet.turnCredentials.iceServers;
};
