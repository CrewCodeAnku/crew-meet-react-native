import React, {FC, ReactElement} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import MeetingTile from '../components/MeetingTile';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardNavigationTypes} from '../types/DashboardNavigationTypes';
type dashboardScreenProp = StackNavigationProp<
  DashboardNavigationTypes,
  'AllMeeting'
>;

const CreateMeeting: FC<{}> = ({}): ReactElement => {
  const navigation = useNavigation<dashboardScreenProp>();
  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, height: '100%'}}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            ...styles.container,
          }}>
          <View style={{width: '90%', justifyContent: 'center'}}>
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
            <MeetingTile />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMeeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 'auto',
    marginTop: 20,
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
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  createBtn: {
    width: '45%',
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
