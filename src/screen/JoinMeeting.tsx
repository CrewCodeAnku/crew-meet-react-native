import React, {FC, ReactElement} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
  isRoomExistAction,
} from '../stores/actions/meet.action.type';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardNavigationTypes} from '../types/DashboardNavigationTypes';
type dashboardScreenProp = StackNavigationProp<
  DashboardNavigationTypes,
  'JoinMeeting'
>;

interface Props {
  setIsRoomHostAction?: any;
  isRoomHost?: any;
  changeHandler?: any;
  isRoomExist?: boolean;
  setConnectOnlyWithAudio?: any;
  connectOnlyWithAudio?: boolean;
  setIdentityAction?: any;
  setRoomIdAction?: any;
  isRoomExistAction?: any;
  navigation?: any;
  route?: any;
}

const CreateMeeting: FC<Props> = (props): ReactElement => {
  const navigation = useNavigation<dashboardScreenProp>();
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, height: '100%'}}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            ...styles.container,
          }}>
          <View style={styles.logo}>
            <Image source={require('../assets/images/meeting.png')} />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter meeting id"
              placeholderTextColor="#003f5c"
              onChangeText={text => {}}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter your name"
              placeholderTextColor="#003f5c"
              onChangeText={text => {}}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
            style={styles.createBtn}>
            <Text style={styles.createText}>Join meeting</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStoreStateToProps = (state: any) => {
  return {
    ...state.meet,
  };
};

const mapActionsToProps = (dispatch: any) => {
  return {
    setIsRoomHostAction: (isRoomHost: any) =>
      dispatch(setIsRoomHost(isRoomHost)),
    setConnectOnlyWithAudio: (onlyWithAudio: any) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity: any) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId: any) => dispatch(setRoomId(roomId)),
    isRoomExistAction: (roomId: any) => dispatch(isRoomExistAction(roomId)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CreateMeeting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 'auto',
    marginTop: 40,
  },
  appBtn: {
    width: '90%',
    backgroundColor: '#DBA800',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  logo: {
    fontFamily: 'Jost-Bold',
    fontWeight: '600',
    fontSize: 30,
    color: '#000000cc',
    marginBottom: 40,
  },
  inputView: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  createBtn: {
    width: '90%',
    backgroundColor: '#DBA800',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  createText: {
    color: '#000',
    fontFamily: 'Jost-Bold',
  },
  inputText: {
    height: 50,
    color: '#000',
    fontFamily: 'Jost-Regular',
  },
});
