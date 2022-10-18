import React, {ReactElement, FC, useState} from 'react';
import {RootState} from '../stores/reducers';
//import UserAvatar from 'react-native-user-avatar-component';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Avatar} from '../components/Avatar';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  changePassword,
  updateProfile,
  updateImage,
  logout,
} from '../stores/actions/session.action.type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigationTypes} from '../types/AuthNavigationTypes';
import toast from '../utilities/toast';
Icon.loadFont();

type authScreenProp = StackNavigationProp<AuthNavigationTypes, 'Login'>;

const ProfileScreen: FC<{}> = ({}): ReactElement => {
  //const [image, setImage] = useState('');
  const [fullname, setFullName] = useState('');
  const [changepassword, setchangepassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [fullNameModalVisible, setFullNameModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const dispatch: any = useDispatch();
  const navigation = useNavigation<authScreenProp>();
  const loading: boolean = useSelector((state: RootState) => state.app.visible);
  const userDetails: any = useSelector(
    (state: RootState) => state.session.userDetails,
  );

  const onAvatarChange = (image: ImageOrVideo) => {
    dispatch(
      updateImage({
        image,
        callback: (data: any) => {
          if (data.success) {
            toast.show('Profile image updated successfully!');
          }
        },
      }),
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View>
        <StatusBar barStyle="dark-content" />
        <View style={styles.userRow}>
          <Avatar
            onChange={onAvatarChange}
            source={require('../assets/images/avatar-placeholder.png')}
          />
          <View style={styles.infoContainer}>
            <Text style={{color: 'gray', fontSize: 16}}>
              {userDetails && userDetails.name ? userDetails.name : 'User'}
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}>
              {userDetails && userDetails.email ? userDetails.email : ''}
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: '2%'}}>
        <Text
          style={{
            marginLeft: '5%',
            color: 'black',
            fontFamily: 'Jost-SemiBold',
            fontSize: 18,
          }}>
          My Account
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            marginLeft: '5%',
            marginRight: '5%',
            marginBottom: 10,
            marginTop: 5,
          }}></View>
        <View
          style={{
            backgroundColor: '#F1F1F1',
            height: '35%',
            marginLeft: '5%',
            marginRight: '5%',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setFullNameModalVisible(true);
            }}
            style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{marginLeft: 8, marginTop: 3}}>
              <Icon name="user" size={30} color="black" />
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.textstyles2}>Change Full Name</Text>
              <Text style={styles.textstyles}>
                You can change your full name
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPasswordModalVisible(true);
            }}
            style={{flexDirection: 'row', marginTop: 30}}>
            <View style={{marginLeft: 8, marginTop: 3}}>
              <Icon name="lock" size={30} color="black" />
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.textstyles2}>Change Password</Text>
              <Text style={styles.textstyles}>
                You can change your password
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: 15,
          }}></View>
        <TouchableOpacity
          onPress={async () => {
            await dispatch(logout());
            navigation.navigate('Login');
          }}
          style={{
            flexDirection: 'row',
            backgroundColor: '#F1F1F1',
            height: '12%',
            marginLeft: '5%',
            marginTop: '5%',
            marginRight: '5%',
            borderRadius: 10,
          }}>
          <View style={{marginLeft: 10, marginTop: 11}}>
            <AntIcon name="logout" size={22} color="black" />
          </View>
          <View style={{marginLeft: 20, alignSelf: 'center'}}>
            <Text style={styles.textstyles2}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Change password modal */}
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => {
          setPasswordModalVisible(!passwordModalVisible);
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
                  Old password
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
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.inputText}
                  onChangeText={password => {
                    setchangepassword(password);
                  }}
                  placeholder="Password..."
                  placeholderTextColor="gray"
                />
              </View>
            </View>
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
                  New Password
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
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.inputText}
                  onChangeText={password => {
                    setconfirmpassword(password);
                  }}
                  placeholder="New Password..."
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
                disabled={loading ? true : false}
                onPress={() => {
                  if (!changepassword) {
                    toast.show('Old Password should not be empty');
                  } else if (!confirmpassword) {
                    toast.show('New Password should not be empty');
                  } else {
                    dispatch(
                      changePassword({
                        data: {
                          oldpassword: changepassword,
                          password: confirmpassword,
                        },
                        callback: (res: any) => {
                          setPasswordModalVisible(!passwordModalVisible);
                          setchangepassword('');
                          setconfirmpassword('');
                        },
                      }),
                    );
                  }
                }}
                style={styles.createBtn}>
                <Text style={styles.createText}>Change Password</Text>
                {loading ? (
                  <ActivityIndicator style={{paddingLeft: 10}} color="white" />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading ? true : false}
                onPress={() => {
                  setPasswordModalVisible(!passwordModalVisible);
                }}
                style={styles.createBtn}>
                <Text style={styles.createText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Change name modal */}
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={fullNameModalVisible}
        onRequestClose={() => {
          setFullNameModalVisible(!fullNameModalVisible);
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
                  Enter New Name
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
                  onChangeText={name => {
                    setFullName(name);
                  }}
                  placeholder="Name..."
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
                disabled={loading ? true : false}
                onPress={() => {
                  if (!fullname) {
                    toast.show('Name should not be empty');
                  } else {
                    dispatch(
                      updateProfile({
                        data: {
                          name: fullname,
                        },
                        callback: (res: any) => {
                          setFullNameModalVisible(!fullNameModalVisible);
                          setFullName('');
                        },
                      }),
                    );
                  }
                }}
                style={styles.createBtn}>
                <Text style={styles.createText}>Update</Text>
                {loading ? (
                  <ActivityIndicator style={{paddingLeft: 10}} color="white" />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading ? true : false}
                onPress={() => {
                  setFullNameModalVisible(!fullNameModalVisible);
                }}
                style={styles.createBtn}>
                <Text style={styles.createText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  textstyles: {color: '#888', fontSize: 13, fontFamily: 'Jost-SemiBold'},
  textstyles2: {
    color: 'black',
    fontFamily: 'Jost-Bold',
    fontSize: 14,
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
  createBtn: {
    width: '45%',
    backgroundColor: '#26a69a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    flexDirection: 'row',
  },
  createText: {
    color: '#fff',
    fontFamily: 'Jost-Bold',
  },
  inputText: {
    height: 50,
    color: '#000',
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  userRow: {
    alignItems: 'center',
    padding: 15,
    marginTop: 70,
  },
  content: {
    flex: 1,
    backgroundColor: '#d8d8db',
  },
  infoContainer: {
    paddingTop: 10,
    paddingBottom: 12,
    alignItems: 'center',
  },
});
export default ProfileScreen;
