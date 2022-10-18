import React, {FC, ReactElement} from 'react';
import {RootState} from '../../stores/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../stores/actions/session.action.type';
import {setDataToInitial} from '../../stores/actions/meet.action.type';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigationTypes} from '../../types/AuthNavigationTypes';
import validation from '../../utilities/validation';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

type authScreenProp = StackNavigationProp<AuthNavigationTypes, 'Login'>;

const Login: FC<{}> = ({}): ReactElement => {
  const dispatch: any = useDispatch();
  const loading: boolean = useSelector((state: RootState) => state.app.visible);

  const stateSchema = {
    email: {value: '', error: ''},
    password: {value: '', error: ''},
  };

  const validationStateSchema = {
    email: {
      required: true,
      validator: {
        regEx:
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        error: 'Enter valid email',
      },
    },
    password: {
      required: true,
    },
  };

  const loginAction = async (state: any) => {
    let data = {
      email: state.email.value,
      password: state.password.value,
      platform: 'crewmeet',
      usertype: 'user',
    };
    await dispatch(setDataToInitial());
    dispatch(
      login({
        data,
        callback: (data: any) => {
          if (data.success && data.emailVerified) {
            navigation.navigate('Home');
          } else if (!data.success && !data.emailVerified) {
            navigation.navigate('OtpCheck');
          }
        },
      }),
    );
  };

  const {state, handleOnChange, handleOnSubmit, disable} = validation(
    stateSchema,
    validationStateSchema,
    loginAction,
  );

  const navigation = useNavigation<authScreenProp>();
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, height: '100%'}}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View>
            <Image
              style={{height: 200, width: 200, marginBottom: 25}}
              source={require('../../../DesignScreen/logo.png')}
            />
          </View>
          <Text style={styles.logo}>Login</Text>
          <View style={{width: '80%'}}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                top: -9,
                left: 15,
                zIndex: 50,
                paddingHorizontal: 10,
              }}>
              <Text style={{color: '#1F1F1F', fontSize: 13}}>Email</Text>
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
                <Icon name="envelope-o" size={22} color="black" />
              </View>
              <TextInput
                style={styles.inputText}
                autoCapitalize="none"
                onChangeText={email => {
                  handleOnChange('email', email);
                }}
                placeholder="Email..."
                placeholderTextColor="gray"
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: state.email.error ? 5 : 0,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '70%',
              marginRight: state.email.error ? 25 : 0,
            }}>
            {state.email.error ? (
              <Text style={{color: 'red'}}>{state.email.error}</Text>
            ) : null}
          </View>

          <View style={{width: '80%', marginTop: 20}}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                top: -9,
                left: 15,
                zIndex: 50,
                paddingHorizontal: 10,
              }}>
              <Text style={{color: '#1F1F1F', fontSize: 13}}>Password</Text>
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
                  handleOnChange('password', password);
                }}
                placeholder="Password..."
                placeholderTextColor="gray"
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: state.password.error ? 5 : 0,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '70%',
              marginRight: state.password.error ? 25 : 0,
            }}>
            {state.password.error ? (
              <Text style={{color: 'red'}}>{state.password.error}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}
            style={{marginTop: 10}}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disable || loading ? true : false}
            onPress={handleOnSubmit}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text>
            {loading ? (
              <ActivityIndicator style={{paddingLeft: 10}} color="white" />
            ) : null}
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.extraText}>
                Don't have an Account?{' '}
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: 'Jost-SemiBold',
                    fontWeight: '800',
                  }}>
                  Signup
                </Text>{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 'auto',
    marginTop: '10%',
  },
  logo: {
    fontFamily: 'Jost-Bold',
    fontWeight: '600',
    fontSize: 30,
    color: '#000000cc',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'lightgray',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000',
    fontFamily: 'Jost-Regular',
  },
  forgot: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#26a69a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
  },
  loginText: {
    color: 'white',
    fontFamily: 'Jost-Bold',
  },

  extraText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
});
