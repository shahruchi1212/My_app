import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import styles from './style';
import { colors } from '../../utils/theme';
import { IOS_PLATFORM } from '../../constants/constants';



const Layout = ({fullScreen = false, hideStatusBar = false, children , isFrom= false }) => {
  return (
    <View style={[ styles.container, hideStatusBar && styles.statusBarPadding ]}>
      <StatusBar
       barStyle="dark-content"
        translucent={true}
        backgroundColor={isFrom ? colors.color_F5F5F5 : colors.background}
        hidden={hideStatusBar}
      />
     

      {fullScreen ? (
        <View style={styles.view}>{children}</View>
      ) : IOS_PLATFORM ? (
        <SafeAreaView style={styles.view}>{children}</SafeAreaView>
      ) : (
        <View style={styles.view}>{children}</View>
      )}
      </View>
    
  );
};

export default Layout;
