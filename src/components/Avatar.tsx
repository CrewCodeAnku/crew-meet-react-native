import React from 'react';
import {
  Image,
  ImageProps as DefaultImageProps,
  ImageURISource,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
//import {CameraIcon, ImageIcon} from './icons';

type ImageProps = DefaultImageProps & {
  source: ImageURISource;
};

interface AvatarProps extends ImageProps {
  onChange?: (file: ImageOrVideo) => void;
}

export const Avatar = (props: AvatarProps) => {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);
  const [visible, setVisible] = React.useState(false);
  //const close = () => setVisible(false);
  const open = () => setVisible(true);
  const chooseImage = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          setUri(image.path);
          props.onChange?.(image);
        })
        .catch(error => console.log('Error', error));
    } catch (error) {
      console.log('Error', error);
    }
  };

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          setUri(image.path);
          props.onChange?.(image);
        })
        .catch(error => console.log('Error', error));
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={open}>
        <Image
          style={styles.avatar}
          {...props}
          source={uri ? {uri} : props.source}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.options}>
            <Pressable style={styles.option} onPress={chooseImage}>
              <Icon name="image" size={30} color="black" />
              <Text>Library </Text>
            </Pressable>
            <Pressable style={styles.option} onPress={openCamera}>
              <Icon name="camera" size={30} color="black" />
              <Text>Camera</Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={[
                styles.button,
                {
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  position: 'absolute',
                  right: 20,
                  top: 8,
                  zIndex: 1,
                },
              ]}>
              <Icon name={'x-circle'} color={'#000'} size={30 / 2} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },

  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },

  options: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20 + 1,
    height: 20 + 1,
    borderRadius: 20 / 2,
  },
});
