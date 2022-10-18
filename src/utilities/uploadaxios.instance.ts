import axios from 'axios';
import Idx from 'idx';
import {API_URL} from '@env';
import {setAuthenticationToken} from '../stores/actions/session.action.type';
import {store} from '../../App';

const AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 1000 * 60 * 2,
});

AxiosInstance.interceptors.request.use(
  (config: any) => config,
  (error: any) => Promise.reject(error),
);

AxiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    //console.log('Error axios', error.response);
    const originalConfig = error.config;
    const errorDetail = {
      code: error.response.status,
      message: error.response.data.message,
    };
    if (Idx(error, _ => _.response.data)) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await AxiosInstance.post('/refreshtoken', {
            accessToken: await store.getState().session.token,
          });
          const {token} = rs.data;
          store.dispatch(setAuthenticationToken(token));
          return AxiosInstance(originalConfig);
        } catch (_error: any) {
          console.log(_error);
          return Promise.reject({
            code: _error.response.status,
            message: _error.response.data.message,
          });
        }
      }
      return Promise.reject(errorDetail);
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
