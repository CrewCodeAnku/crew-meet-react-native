import {connect} from 'react-redux';
import {setActiveConversation} from '../stores/actions/meet.action.type';
import UserAvatar from 'react-native-user-avatar-component';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const SingleParticipant = (props: any) => {
  const {identity, participant, setActiveConversationAction, socketId} = props;

  const handleOpenActiveChatbox = () => {
    setActiveConversationAction(participant);
    /*if (participant.socketId !== socketId) {
      setActiveConversationAction(participant);
    }*/
  };

  return (
    <TouchableOpacity
      style={{paddingLeft: 20}}
      onPress={handleOpenActiveChatbox}>
      <View style={{flexDirection: 'row'}}>
        <UserAvatar name={identity} />
        <View style={{justifyContent: 'center', marginLeft: 5}}>
          <Text style={styles.item}>{identity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Participants = ({
  participants,
  setActiveConversationAction,
  socketId,
}: {
  participants?: any;
  setActiveConversationAction?: any;
  socketId?: any;
}) => {
  return (
    <View style={{flex: 1}}>
      {participants.map((participant: any, index: any) => {
        return (
          <SingleParticipant
            key={participant.identity}
            lastItem={participants.length === index + 1}
            participant={participant}
            identity={participant.identity}
            setActiveConversationAction={setActiveConversationAction}
            socketId={socketId}
          />
        );
      })}
    </View>
  );
};

const mapStoreStateToProps = (state: any) => {
  return {
    ...state.meet,
  };
};

const mapActionsToProps = (dispatch: any) => {
  return {
    setActiveConversationAction: (activeConversation: any) =>
      dispatch(setActiveConversation(activeConversation)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Jost-Regular',
  },
});
