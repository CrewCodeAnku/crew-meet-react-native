import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../stores/reducers';
import {connect} from 'react-redux';
import * as webRTCHandler from '../utils/webRTCHandler';
import {MediaStream} from 'react-native-webrtc';
import {StyleSheet, SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardNavigationTypes} from '../types/DashboardNavigationTypes';
import RTCViewGrid from '../components/RTCView';
import VideoCallButtons from '../components/VideoCallButtons';

type dashboardScreenProp = StackNavigationProp<
  DashboardNavigationTypes,
  'Meeting'
>;

interface Props {
  roomId?: any;
  identity?: string;
  isRoomHost?: boolean;
  showOverlay?: boolean;
  connectOnlyWithAudio?: boolean;
  messages?: any[];
}

const Meeting: React.FC<Props> = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  const navigation = useNavigation<dashboardScreenProp>();
  const streamdata: MediaStream[] = useSelector(
    (state: RootState) => state.meet.streamsdata,
  );

  useEffect(() => {
    if (!isRoomHost && !roomId) {
      navigation.navigate('Dashboard');
    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        identity,
        roomId,
        connectOnlyWithAudio,
      );
    }
  }, []);

  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <RTCViewGrid streams={streamdata} />
        <VideoCallButtons />
      </SafeAreaView>
    </React.Fragment>
  );
};

const mapStoreStateToProps = (state: any) => {
  return {
    ...state.meet,
    ...state.session,
  };
};

export default connect(mapStoreStateToProps)(Meeting);
