import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import CallingLoader from './CallingLoader';

export default ({streams}: any) => {
  const RTCViewRendered = ({userId, stream}: any) => {
    if (stream) {
      //console.log('Stream', stream.toURL());
      return (
        <React.Fragment>
          <RTCView
            style={styles.myStream}
            objectFit="cover"
            streamURL={stream.toURL()}
            zOrder={1}
          />
        </React.Fragment>
      );
    }

    return (
      <View style={styles.blackView}>
        <CallingLoader name="Kevin" />
      </View>
    );
  };

  const streamsCount = streams.length;

  let RTCListView = null;

  switch (streamsCount) {
    case 1:
      RTCListView = <RTCViewRendered userId={'Kevin'} stream={streams[0]} />;
      break;

    case 2:
      RTCListView = (
        <View style={styles.inColumn}>
          <RTCViewRendered userId={''} stream={streams[1]} />
          <RTCViewRendered userId={''} stream={streams[2]} />
        </View>
      );
      break;

    case 3:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered userId={''} stream={streams[0]} />
            <RTCViewRendered userId={''} stream={streams[2]} />
          </View>
          <RTCViewRendered userId={''} stream={streams[3]} />
        </View>
      );
      break;

    case 4:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered userId={''} stream={streams[0]} />
            <RTCViewRendered userId={''} stream={streams[1]} />
          </View>
          <View style={styles.inRow}>
            <RTCViewRendered userId={''} stream={streams[2]} />
            <RTCViewRendered userId={''} stream={streams[3]} />
          </View>
        </View>
      );
      break;

    default:
      break;
  }

  return <View style={styles.blackView}>{RTCListView}</View>;
};

const styles = StyleSheet.create({
  myStream: {
    width: '100%',
    height: '100%',
  },
  blackView: {
    flex: 1,
    backgroundColor: 'black',
  },
  inColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  inRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
