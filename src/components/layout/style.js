import {StatusBar, StyleSheet} from 'react-native';
import { VERTICAL_DIMENS } from '../../constants/dimens';
import { colors } from '../../utils/theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
     paddingTop: StatusBar.currentHeight,
  },
  container1: {
    flex: 1,
    backgroundColor: colors.color_F5F5F5,
    //  paddingTop: StatusBar.currentHeight,
  },
  view: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom : VERTICAL_DIMENS._5
   
  },
  statusBarPadding: {
    paddingTop: 0,
  },
});

export default styles;
