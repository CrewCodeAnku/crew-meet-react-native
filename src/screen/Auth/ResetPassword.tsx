import React, {FC, ReactElement} from 'react';
import {RootState} from '../../stores/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../stores/actions/session.action.type';
import {resetPassword} from '../../stores/actions/session.action.type';
import validation from '../../utilities/validation';
import toast from '../../utilities/toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigationTypes} from '../../types/AuthNavigationTypes';
type authScreenProp = StackNavigationProp<
  AuthNavigationTypes,
  'ForgetPassword'
>;

const ResetPassword: FC<{}> = ({}): ReactElement => {
  const dispatch: any = useDispatch();
  const loading: boolean = useSelector((state: RootState) => state.app.visible);
  const forgotemail: string = useSelector(
    (state: RootState) => state.session.forgotemail,
  );

  //console.log('Email', forgotemail);

  const stateSchema = {
    otp: {value: '', error: ''},
    password: {value: '', error: ''},
    confirmpassword: {value: '', error: ''},
  };
  const validationStateSchema = {
    otp: {
      required: true,
    },
    password: {
      required: true,
      validator: {
        regEx:
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        error:
          'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      },
    },
    confirmpassword: {
      required: true,
    },
  };

  const resendEmail = async () => {
    let data = {
      email: forgotemail,
    };
    dispatch(
      forgotPassword({
        data,
        callback: (data: any) => {
          if (data.success) {
            toast.show('Otp successfully send to your email!');
          }
        },
      }),
    );
  };

  const resetPasswordAction = async (state: any) => {
    if (state.password.value !== state.confirmpassword.value) {
      toast.show('Password doesnot match with confirm password!');
    } else {
      let data = {
        otp: state.otp.value,
        email: forgotemail,
        password: state.password.value,
      };
      dispatch(
        resetPassword({
          data,
          callback: (data: any) => {
            if (data.success) {
              navigation.navigate('Login');
            }
          },
        }),
      );
    }
  };

  const {state, handleOnChange, handleOnSubmit, disable} = validation(
    stateSchema,
    validationStateSchema,
    resetPasswordAction,
  );

  const navigation = useNavigation<authScreenProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Reset password</Text>
      <Text style={{...styles.extraText, marginBottom: 20}}>
        Enter your new password to change
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
            placeholder="Otp"
            placeholderTextColor="#003f5c"
            onChangeText={password => {
              handleOnChange('otp', password);
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
        {state.password.error ? (
          <Text style={{color: 'red'}}>{state.otp.error}</Text>
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
            style={styles.inputText}
            placeholder="New password"
            placeholderTextColor="#003f5c"
            onChangeText={password => {
              handleOnChange('password', password);
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginBottom: state.password.error ? 20 : 0,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '70%',
        }}>
        {state.password.error ? (
          <Text style={{color: 'red'}}>{state.password.error}</Text>
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
            style={styles.inputText}
            placeholder="Confirm password"
            placeholderTextColor="#003f5c"
            onChangeText={password => {
              handleOnChange('confirmpassword', password);
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginBottom: state.confirmpassword.error ? 20 : 0,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '70%',
        }}>
        {state.confirmpassword.error ? (
          <Text style={{color: 'red'}}>{state.confirmpassword.error}</Text>
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
        <Text style={styles.otpcheckText}>Change password</Text>
        {loading ? <ActivityIndicator style={{paddingLeft: 10}} /> : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => {
          resendEmail();
        }}>
        <Text style={styles.forgot}>
          Didn't recieve the otp? click to resend!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

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
    width: '80%',
    backgroundColor: '#26a69a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    flexDirection: 'row',
  },
  otpcheckText: {
    color: '#000',
    fontFamily: 'Jost-Bold',
  },
  extraText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
});
