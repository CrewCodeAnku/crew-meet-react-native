import {ToastAndroid, Platform, Alert} from 'react-native';

const toast = {
  show: (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  },
};

export default toast;
