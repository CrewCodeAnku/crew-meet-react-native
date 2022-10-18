import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {logout} from '../stores/actions/session.action.type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigationTypes} from '../types/AuthNavigationTypes';
Icon.loadFont();

type authScreenProp = StackNavigationProp<AuthNavigationTypes, 'Login'>;

const CustomDrawer = (props: any) => {
  const dispatch: any = useDispatch();
  const navigation = useNavigation<authScreenProp>();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          padding: 15,
          backgroundColor: '#26a69a',
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: 90,
            width: 90,
            marginRight: '5%',
          }}>
          <ImageBackground
            style={{height: 90, width: 90}}
            imageStyle={{
              borderRadius: 90,
              borderWidth: 2,
              borderColor: 'black',
            }}
            source={{
              uri: 'https://de2g2pzerdhu6.cloudfront.net/wp-content/uploads/2019/05/dummy-man-570x570.png',
            }}
          />
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            fontFamily: 'Jost-SemiBold',
          }}>
          Anks
        </Text>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#26a69a'}}>
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 10}}>
          <DrawerItemList {...props}></DrawerItemList>
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={async () => {
            await dispatch(logout());
            navigation.navigate('Login');
          }}
          style={{}}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="logout"
              size={20}
              color="black"
              style={{marginTop: 1}}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Jost-SemiBold',
                fontWeight: '600',
                color: 'black',
                marginLeft: 10,
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
