// src/components/CustomTextInput.js

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, FONT_SIZE, FONT_WEIGHT } from '../../utils/theme';
import { HORIZONTAL_DIMENS, VERTICAL_DIMENS } from '../../constants/dimens';


const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  ...rest 
}) => {
  return (
    <View style={componentStyles.inputGroup}>
      <Text style={componentStyles.label}>{label}</Text>
      <TextInput
        style={componentStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        {...rest}
      />
    </View>
  );
};

export default CustomTextInput;

const componentStyles = StyleSheet.create({
  inputGroup: {
    marginBottom: VERTICAL_DIMENS._20,
  },
  label: {
    fontSize: FONT_SIZE._16,
    color: colors.color_848484,
    fontWeight: FONT_WEIGHT._600,
    marginBottom: VERTICAL_DIMENS._8,
  },
  input: {
    height: 50,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: HORIZONTAL_DIMENS._15,
    fontSize: FONT_SIZE._18,
    color: colors.textPrimary,
  },
});