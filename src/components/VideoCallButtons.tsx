import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import DirectChat from '../components/DirectChat';
import Participants from '../components/Participants';
import * as webRTCHandler from '../utils/webRTCHandler';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../stores/reducers';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardNavigationTypes} from '../types/DashboardNavigationTypes';
import {setDataToInitial} from '../stores/actions/meet.action.type';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

type dashboardScreenProp = StackNavigationProp<
  DashboardNavigationTypes,
  'Dashboard'
>;

const VideoCallButtons = (props: any) => {
  const dispatch = useDispatch();
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);
  const [groupChat, setGroupChat] = useState(false);
  const [directChat, setDirectChat] = useState(false);
  const [giftedchatmessages, setGiftedMessages] = useState([] as any);
  const userDetails = useSelector(
    (state: RootState) => state.session.userDetails,
  );
  const activeConversation = useSelector(
    (state: RootState) => state.meet.activeConversation,
  );

  const messages = useSelector((state: RootState) => state.meet.messages);
  const navigation = useNavigation<dashboardScreenProp>();

  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisabled);
    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };

  const flipCamera = () => {
    webRTCHandler.switchCamera();
  };

  const startChat = () => {
    setGroupChat(true);
  };

  const showPeople = () => {
    setDirectChat(true);
  };

  const callEnd = () => {
    webRTCHandler.endCall();
    dispatch(setDataToInitial());
    navigation.goBack();
  };

  useEffect(() => {
    let allmessages: any = [];
    messages?.forEach((item: any) => {
      allmessages.push({
        _id: Math.round(Math.random() * 1000000),
        text: item.content,
        createdAt: new Date(item.date),
        user: {
          _id: item.identity._id,
          name: item.identity.name,
        },
      });
    });
    setGiftedMessages(allmessages);
  }, []);

  const onSend = useCallback((messages: any = []) => {
    webRTCHandler.sendMessageUsingDataChannel(messages[0].text);
    setGiftedMessages((previousMessages: IMessage[] | undefined) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const _renderCallStopButton = () => {
    const style = styles.buttonCallEnd;
    const type = 'call-end';
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, style]}
        onPress={callEnd}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  const _renderMuteButton = () => {
    const type = isMicMuted ? 'mic-off' : 'mic';
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonMute]}
        onPress={handleMicButtonPressed}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  const _renderFlipButton = () => {
    const type = 'camera-flip-outline';
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonMute]}
        onPress={flipCamera}>
        <MaterialCommunityIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  const _renderVideoMuteButton = () => {
    const type = isLocalVideoDisabled ? 'video-off' : 'video';
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonMute]}
        onPress={handleCameraButtonPressed}>
        <FeatherIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  const _renderMoreButton = () => {
    const type = 'dots-three-vertical';
    const typepeople = 'account-group-outline';
    const chattype = 'chat';
    return (
      <View style={[styles.buttonContainer, styles.buttonMute]}>
        <Menu>
          <MenuTrigger>
            <EntypoIcon name={type} size={32} color="white" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => {
                startChat();
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcon name={chattype} size={25} color="black" />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: 'Jost-Regular',
                    marginLeft: 10,
                  }}>
                  Group Chat
                </Text>
              </View>
            </MenuOption>
            <View style={styles.divider} />
            <MenuOption
              onSelect={() => {
                showPeople();
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcon
                  name={typepeople}
                  size={25}
                  color="black"
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: 'Jost-Regular',
                    marginLeft: 10,
                  }}>
                  People in meeting
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const _renderBubble = (props: any) => {
    const message_sender_id = props.currentMessage.user._id;
    return (
      <Bubble
        {...props}
        position={message_sender_id == userDetails._id ? 'right' : 'left'}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 12,
          },
          left: {
            fontSize: 12,
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#26a69a',
            marginRight: 5,
            marginVertical: 5,
          },
          left: {
            marginVertical: 5,
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.toolBarItem}>{_renderMuteButton()}</View>
        <View style={styles.toolBarItem}>{_renderVideoMuteButton()}</View>
        <View style={styles.toolBarItem}>{_renderCallStopButton()}</View>
        <View style={styles.toolBarItem}>{_renderFlipButton()}</View>
        <View style={styles.toolBarItem}>{_renderMoreButton()}</View>
      </View>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={groupChat}
        onRequestClose={() => {
          // this.closeButtonFunction()
        }}>
        <View
          style={{
            height: '50%',
            marginTop: 'auto',
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View style={{width: '100%', height: '100%', marginTop: 30}}>
            <GiftedChat
              messages={giftedchatmessages}
              renderBubble={_renderBubble}
              onSend={(messages: any) => onSend(messages)}
              user={{
                _id: userDetails._id,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setGroupChat(false);
            }}
            style={[
              styles.button,
              {
                backgroundColor: 'white',
                borderColor: 'grey',
                position: 'absolute',
                right: 20,
                top: 8,
                zIndex: 1,
              },
            ]}>
            <MaterialIcon name={'close'} color={'#000'} size={30 / 2} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={directChat}
        onRequestClose={() => {
          setDirectChat(!directChat);
        }}>
        <View
          style={{
            height: '50%',
            marginTop: 'auto',
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View>
            <View style={{width: '100%', height: '100%', marginTop: 30}}>
              {activeConversation ? <DirectChat /> : null}
              {!activeConversation ? <Participants /> : null}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setDirectChat(false);
            }}
            style={[
              styles.button,
              {
                backgroundColor: 'white',
                borderColor: 'grey',
                position: 'absolute',
                right: 20,
                top: 8,
                zIndex: 1,
              },
            ]}>
            <MaterialIcon name={'close'} color={'#000'} size={30 / 2} />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default VideoCallButtons;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    width: '100%',
  },
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 100,
  },
  toolBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMute: {
    backgroundColor: '#26a69a',
  },
  buttonCallEnd: {
    backgroundColor: 'red',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20 + 1,
    height: 20 + 1,
    borderWidth: 1,
    borderRadius: 20 / 2,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    height: '50%',
  },
  modalcenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: '50%',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
