import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Layout from '../../components/layout';


import { useDispatch, useSelector } from 'react-redux';

import { colors, FONT_SIZE, FONT_WEIGHT } from '../../utils/theme';
import { AUTH_IMAGES } from '../../constants/images';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import { loginService } from '../../redux/apis/auth';
import { _DEVICE_WIDTH, HORIZONTAL_DIMENS, VERTICAL_DIMENS } from '../../constants/dimens';
import { clearError } from '../../redux/features/auth-slice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  
  const { status, error, isLoading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  const isFormInvalid = !username.trim() || !password.trim();

  const isButtonDisabled = status === 'loading' || isFormInvalid;
  // --------------------------

  const handleLogin = () => {
    if (status === 'loading') return; 

    if (isFormInvalid) {
        Alert.alert("Input Required", "Please enter both username and password.");
        return;
    }
    
    dispatch(loginService({ username, password }));
  };

  useEffect(() => {
    if (status === 'failed' && error) {
      Alert.alert(
        "Login Failed", 
        error, 
        [{ text: "OK", onPress: () => dispatch(clearError()) }]
      );
    }
  }, [status, error, dispatch]);

  return (
    <Layout>
 
      <KeyboardAvoidingView
        style={screenStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : ''} 
         keyboardVerticalOffset={10} 
      >
        <ScrollView 
          contentContainerStyle={screenStyles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" 
        >
          <View style={screenStyles.imageContainer}>
            <Image 
              source={AUTH_IMAGES.LoginBanner} 
              style={screenStyles.bannerImage}
              resizeMode="contain" 
            />
          </View>
          
          <View style={screenStyles.contentContainer}>
            <View style={screenStyles.formContainer}>
              <Text style={screenStyles.title}>Login</Text>
              <CustomTextInput
                label="User Name"
                value={username}
                onChangeText={setUsername}
                placeholder="Enter User Name"
                autoCapitalize="none"
                editable={status !== 'loading'}
              />

              <CustomTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password" 
                secureTextEntry={true}
                editable={status !== 'loading'}
              />
            </View>
            
          </View>
        </ScrollView>
        <View style={screenStyles.buttonWrapper}>
          <TouchableOpacity 
              style={[screenStyles.loginButton, isButtonDisabled && screenStyles.disabledButton]} 
              onPress={handleLogin}
              disabled={isButtonDisabled}
            >
              {status === 'loading' ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={screenStyles.buttonText}>Log In</Text>
              )}
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default LoginScreen;

const screenStyles = StyleSheet.create({
 
  keyboardAvoidingView: {
    flex: 1,
  },
 
  scrollViewContent: {
    flexGrow: 1, 
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_DIMENS._20, 
  },
  imageContainer: {
    flex: 0.5, 
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: _DEVICE_WIDTH * 0.8, 
    marginVertical: VERTICAL_DIMENS._20,
    width : _DEVICE_WIDTH,
    
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1 
  },
  title: {
    fontSize: FONT_SIZE._30, 
    fontWeight: FONT_WEIGHT._600,
    marginTop: VERTICAL_DIMENS._10,
    marginBottom: VERTICAL_DIMENS._30,
    color: colors.color_1F1F1F, 
  },

  buttonWrapper: {
    paddingHorizontal: HORIZONTAL_DIMENS._20,
    paddingBottom:  VERTICAL_DIMENS._20, 
    backgroundColor: colors.white,
  },
  loginButton: {
    backgroundColor: colors.color_375BFB, 
    height: VERTICAL_DIMENS._52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
      opacity: 0.5, 
  },
  buttonText: {
    color: colors.white,
    fontSize: FONT_SIZE._18,
    fontWeight: 'bold',
  },
});