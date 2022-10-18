import React, {FC, ReactElement, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Modal,
} from 'react-native';

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
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect, useSelector} from 'react-redux';
import {RootState} from '../stores/reducers';
import toast from '../utilities/toast';
import {fetchTURNCredentials} from '../utils/turn';
Icon.loadFont();
//import MeetingTile from '../components/MeetingTile';

type authScreenProp = StackNavigationProp<
  DashboardNavigationTypes,
  'Dashboard'
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

const Dashboard: FC<Props> = (props): ReactElement => {
  const {
    isRoomHost,
    isRoomExist,
    setIdentityAction,
    setRoomIdAction,
    isRoomExistAction,
  } = props;

  const [ordermodalVisible, setOrderModalVisible] = useState(false);
  const [joinmodalVisible, setJoinModalVisible] = useState(false);
  const [roomIdValue, setRoomIdValue] = useState('');

  const userDetails: any = useSelector(
    (state: RootState) => state.session.userDetails,
  );

  useEffect(() => {
    //fetchTURNCredentials();
  }, []);

  const handleJoinRoom = async () => {
    setIdentityAction(userDetails && userDetails.name ? userDetails.name : '');
    if (isRoomHost) {
      await createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    await isRoomExistAction(roomIdValue);
    if (!isRoomExist) {
      toast.show('Meeting is full. Please try again later.');
    } else {
      setRoomIdAction(roomIdValue);
      navigation.navigate('Meeting');
    }
  };

  const createRoom = () => {
    navigation.navigate('Meeting');
  };

  const navigation = useNavigation<authScreenProp>();
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, height: '100%'}}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            ...styles.container,
            marginTop: 30,
            paddingHorizontal: 5,
          }}>
          {/*<View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Search your meeting..."
              placeholderTextColor="#003f5c"
              onChangeText={text => {}}
            />
        </View>*/}
          <View style={styles.schedule}>
            <TouchableOpacity
              onPress={() => {
                setOrderModalVisible(true);
                props.setIsRoomHostAction(true);
                // navigation.navigate('CreateMeeting', {host: true});
              }}>
              <View style={styles.meeting}>
                <Image source={require('../assets/images/businessmen.png')} />
                <Text
                  style={{
                    fontFamily: 'Jost-Medium',
                    fontSize: 16,
                    color: '#000',
                  }}>
                  Create meeting
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setJoinModalVisible(true);
                props.setIsRoomHostAction(false);
                //navigation.navigate('JoinMeeting', {host: false});
              }}>
              <View style={styles.meeting}>
                <Image source={require('../assets/images/meeting.png')} />
                <Text
                  style={{
                    fontFamily: 'Jost-Medium',
                    fontSize: 16,
                    color: '#000',
                  }}>
                  Join meeting
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 400}}>
            <Swiper>
              <View style={styles.slide1}>
                <Text style={styles.header}>Get a link that you can share</Text>
                <Text style={styles.text}>
                  Tab
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'Jost-Regular',
                      fontWeight: '600',
                    }}>
                    {''} Create Meeting {''}
                  </Text>
                  to get a link that you can send to people that you want to
                  meet with
                </Text>
              </View>
              <View style={styles.slide1}>
                <Text style={styles.header}>Your Meeting is safe</Text>
                <Text style={styles.text}>
                  No one can join metting unless invited or admitted by the host
                </Text>
              </View>
            </Swiper>
          </View>
          {/*<View style={styles.upcomingmeet}>
            <Text style={styles.upcomingmeettext}>Upcoming meeting</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllMeeting');
              }}>
              <Text style={{fontFamily: 'Jost-Bold', fontSize: 12}}>
                View All
              </Text>
            </TouchableOpacity>
            </View>*/}
          {/*<View style={{width: '90%', justifyContent: 'center'}}>
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
          </View>*/}

          <Modal
            animationType="fade"
            presentationStyle="overFullScreen"
            transparent={true}
            visible={joinmodalVisible}
            onRequestClose={() => {
              setJoinModalVisible(!joinmodalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{width: '100%', marginTop: 20}}>
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'white',
                      top: -9,
                      left: 15,
                      zIndex: 50,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: '#1F1F1F', fontSize: 13}}>
                      Enter Meeting Id
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderRadius: 10,
                      alignItems: 'flex-start',
                    }}>
                    <View
                      style={{
                        marginTop: 12,
                        marginLeft: 5,
                        marginRight: 10,
                      }}>
                      <Icon name="lock" size={22} color="black" />
                    </View>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.inputText}
                      onChangeText={meetid => {
                        setRoomIdValue(meetid);
                      }}
                      placeholder="Meeting ID..."
                      placeholderTextColor="gray"
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!roomIdValue) {
                        toast.show('Enter Meeting Id');
                      } else {
                        handleJoinRoom();
                      }
                    }}
                    style={styles.createBtn}>
                    <Text style={styles.createText}>Join meeting</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setJoinModalVisible(!joinmodalVisible);
                    }}
                    style={styles.createBtn}>
                    <Text style={styles.createText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            presentationStyle="overFullScreen"
            transparent={true}
            visible={ordermodalVisible}
            onRequestClose={() => {
              setOrderModalVisible(!ordermodalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    setOrderModalVisible(false);
                    handleJoinRoom();
                    //navigation.navigate('CreateMeeting', {host: true});
                  }}>
                  <Icon
                    name="video-camera"
                    size={22}
                    color="black"
                    style={{marginRight: 10}}
                  />

                  <Text
                    style={{
                      fontFamily: 'Jost-Medium',
                      fontSize: 16,
                      marginBottom: 20,
                      color: 'black',
                    }}>
                    Start an instant meeting
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    setOrderModalVisible(false);
                  }}>
                  <Icon
                    name="close"
                    size={22}
                    color="black"
                    style={{marginRight: 10}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Jost-Medium',
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 'auto',
  },
  headline: {
    fontFamily: 'Jost-Black',
    fontWeight: '600',
    fontSize: 30,
    color: '#000000cc',
    marginBottom: 10,
  },
  appBtn: {
    width: '80%',
    backgroundColor: '#DBA800',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  inputView: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000',
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  createBtn: {
    width: '45%',
    backgroundColor: '#26a69a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  createText: {
    color: '#fff',
    fontFamily: 'Jost-Bold',
  },
  schedule: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  meeting: {
    backgroundColor: '#ffffff',
    width: (Dimensions.get('window').width - 16 * 3) / 2,
    marginLeft: 10,
    height: 120,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingmeet: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingmeettext: {
    fontFamily: 'Jost-Bold',
    fontSize: 20,
    color: '#000',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 44,
    marginRight: 46,
    marginBottom: 5,
  },

  text: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Jost-Regular',
  },
  header: {
    fontWeight: '800',
    fontSize: 22,
    color: '#333333',
    lineHeight: 38,
    fontFamily: 'Jost-Bold',
    textAlign: 'center',
  },
});
