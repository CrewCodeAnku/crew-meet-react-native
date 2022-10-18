import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
//import BottomSheet from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {RootState} from '../stores/reducers';
//import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import * as wss from '../utils/wss';
//import * as webRTCHandler from '../utils/webRTCHandler';
import {connect} from 'react-redux';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const getDirectChatHistory = (directChatHistory: any, socketId = null) => {
  let allmessages: any = [];
  if (!socketId || !directChatHistory) {
    return [];
  }
  const history = directChatHistory.find((h: any) => h.socketId === socketId);
  if (history.chatHistory) {
    history.chatHistory.forEach((item: any) => {
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
  }
  return history ? allmessages : [];
};

const DirectChat = ({
  activeConversation,
  directChatHistory,
}: {
  activeConversation?: any;
  directChatHistory?: any;
}) => {
  const BUTTON_SIZE = 30;
  const [giftedchatmessages, setGiftedMessages] = useState([] as any);
  //const [messages, setMessages] = useState([]);

  const userDetails = useSelector(
    (state: RootState) => state.session.userDetails,
  );

  /*const onSend = useCallback((messages: any = []) => {
    webRTCHandler.sendMessageUsingDataChannel(messages[0].text);
    setGiftedMessages((previousMessages: IMessage[] | undefined) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);*/
  const renderBubble = (props: any) => {
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

  const sendMessage = (message: any) => {
    wss.sendDirectMessage({
      receiverSocketId: activeConversation.socketId,
      identity: {name: activeConversation.identity, _id: userDetails._id},
      messageContent: message[0].text,
      date: new Date(),
    });
  };

  useEffect(() => {
    setGiftedMessages(
      getDirectChatHistory(
        directChatHistory,
        activeConversation ? activeConversation.socketId : null,
      ),
    );
  }, [activeConversation, directChatHistory]);

  return (
    <React.Fragment>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {}}
          style={[
            styles.button,
            {
              backgroundColor: 'white',
              borderColor: 'grey',
              position: 'absolute',
              right: 20,
              zIndex: 1,
            },
          ]}>
          <Icon name={'close'} color={'#000'} size={BUTTON_SIZE / 2} />
        </TouchableOpacity>
        <GiftedChat
          messages={giftedchatmessages}
          renderBubble={renderBubble}
          onSend={(messages: any) => sendMessage(messages)}
          user={{
            _id: userDetails._id,
          }}
        />
      </View>
    </React.Fragment>
  );
};

const mapStoreStateToProps = (state: any) => {
  return {
    ...state.meet,
  };
};

export default connect(mapStoreStateToProps)(DirectChat);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30 + 1,
    height: 30 + 1,
    borderWidth: 1,
    borderRadius: 30 / 2,
  },
});
