import React, {FC, ReactElement} from 'react';
import {RootState} from '../../stores/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../stores/actions/session.action.type';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigationTypes} from '../../types/AuthNavigationTypes';
import validation from '../../utilities/validation';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
type authScreenProp = StackNavigationProp<
  AuthNavigationTypes,
  'ForgetPassword'
>;

const ForgotPassword: FC<{}> = ({}): ReactElement => {
  const dispatch: any = useDispatch();
  const loading: boolean = useSelector((state: RootState) => state.app.visible);
  const stateSchema = {
    email: {value: '', error: ''},
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
  };
  const forgotAction = async (state: any) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    let data = {
      email: state.email.value,
      otp: otp,
    };
    dispatch(
      forgotPassword({
        data,
        callback: (data: any) => {
          if (data.success) {
            navigation.navigate('ResetPassword');
          } else {
            //console.log('Data', data);
          }
        },
      }),
    );
  };
  const {state, handleOnChange, handleOnSubmit, disable} = validation(
    stateSchema,
    validationStateSchema,
    forgotAction,
  );
  const navigation = useNavigation<authScreenProp>();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{height: 200, width: 200, marginBottom: 25, marginTop: '10%'}}
          source={require('../../../DesignScreen/logo.png')}
        />
      </View>
      <Text style={styles.logo}>Forgot your password?</Text>
      <Text style={{...styles.extraText, marginBottom: 20}}>
        Enter email to send otp for email verification
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
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={email => {
              handleOnChange('email', email);
            }}
          />
        </View>
      </View>
      {/* <View
        style={{
          ...styles.inputView,
          marginBottom: state.email.error ? 10 : 20,
        }}>
        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={email => {
            handleOnChange('email', email);
          }}
        />
      </View> */}
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

      <TouchableOpacity
        disabled={disable || loading ? true : false}
        onPress={handleOnSubmit}
        style={styles.forgotpassBtn}>
        <Text style={styles.forgotpassText}>Send OTP</Text>
        {loading ? <ActivityIndicator style={{paddingLeft: 10}} /> : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.forgot}>
          I remember my password!{' '}
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Jost-SemiBold',
              fontWeight: '800',
            }}>
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'white',
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
  forgotpassBtn: {
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
  forgotpassText: {
    color: 'white',
    fontFamily: 'Jost-Bold',
  },

  extraText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
});
