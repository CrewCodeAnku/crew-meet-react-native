import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const MeetingTile = () => {
  return (
    <TouchableOpacity>
      <View style={styles.tile}>
        <Text
          style={{
            color: '#DBA800',
            fontFamily: 'Jost-Bold',
            fontSize: 14,
            marginBottom: 5,
          }}>
          Meeting ID: 754-124-535
        </Text>
        <Text
          style={{
            fontFamily: 'Jost-Bold',
            fontSize: 18,
            color: '#000',
            marginBottom: 5,
          }}>
          Client Meeting- For Website
        </Text>
        <Text style={{fontFamily: 'Jost-Regular', fontSize: 14, color: '#000'}}>
          5:00PM
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MeetingTile;

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 80,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 20,
    marginTop: 10,
  },
});
