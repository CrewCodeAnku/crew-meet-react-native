import React, {FC, ReactElement, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RootState} from '../../stores/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {verifyEmail} from '../../stores/actions/session.action.type';
import {resendVerifyEmail} from '../../stores/actions/session.action.type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigationTypes} from '../../types/AuthNavigationTypes';
import validation from '../../utilities/validation';
import toast from '../../utilities/toast';
import Icon from 'react-native-vector-icons/FontAwesome';
//import toast from '../../utilities/toast';
type authScreenProp = StackNavigationProp<
  AuthNavigationTypes,
  'ForgetPassword'
>;

const OtpCheck: FC<{}> = ({}): ReactElement => {
  const dispatch: any = useDispatch();
  const loading: boolean = useSelector((state: RootState) => state.app.visible);
  const registeremail: string = useSelector(
    (state: RootState) => state.session.registeremail,
  );
  const navigation = useNavigation<authScreenProp>();

  const stateSchema = {
    otp: {value: '', error: ''},
  };
  const validationStateSchema = {
    otp: {
      required: true,
    },
  };

  const resendEmail = async () => {
    console.log('Register email', registeremail);
    let data = {
      email: registeremail,
    };
    dispatch(
      resendVerifyEmail({
        data,
        callback: (data: any) => {
          if (data.success) {
            toast.show('Otp successfully send to your email!');
          }
        },
      }),
    );
  };

  const verifyAction = async (state: any) => {
    let data = {
      otp: state.otp.value,
      email: registeremail,
    };
    dispatch(
      verifyEmail({
        data,
        callback: (data: any) => {
          if (data.success) {
            navigation.navigate('Login');
          }
        },
      }),
    );
  };

  const {state, handleOnChange, handleOnSubmit, disable} = validation(
    stateSchema,
    validationStateSchema,
    verifyAction,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Verify Email</Text>
      <Text style={{...styles.extraText, marginBottom: 20}}>
        Enter otp send to your email
      </Text>
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
          <Text style={{color: '#1F1F1F', fontSize: 13}}>Otp</Text>
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
            style={styles.inputText}
            placeholder="OTP..."
            placeholderTextColor="#003f5c"
            onChangeText={otp => {
              handleOnChange('otp', otp);
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginBottom: state.otp.error ? 20 : 0,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '70%',
        }}>
        {state.otp.error ? (
          <Text style={{color: 'red'}}>{state.otp.error}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.forgot}>Skip to login!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOnSubmit} style={styles.otpcheckBtn}>
        <Text style={styles.otpcheckText}>Verify</Text>
        {loading ? <ActivityIndicator style={{paddingLeft: 10}} /> : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => {
          resendEmail();
        }}>
        <Text style={styles.forgot}>
          Didn't recieve the code? click to resend!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpCheck;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
  logo: {
    fontFamily: 'Jost-Bold',
    fontWeight: '600',
    fontSize: 30,
    color: '#000000cc',
    marginBottom: 10,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffffff',
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
  otpcheckBtn: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#26a69a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  otpcheckText: {
    color: 'white',
    fontFamily: 'Jost-Bold',
  },

  extraText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
});
