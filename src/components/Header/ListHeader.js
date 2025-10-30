import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { _DEVICE_WIDTH, HORIZONTAL_DIMENS, VERTICAL_DIMENS } from '../../constants/dimens';
import { colors, FONT_SIZE, FONT_WEIGHT } from '../../utils/theme';


const ListHeader = ({ headerText }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>{headerText}</Text>
        </View>
    );
};

export default ListHeader;

const styles = StyleSheet.create({
    headerContainer: {
        height: 110,
        width: _DEVICE_WIDTH,
        backgroundColor: colors.color_F5F5F5,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: VERTICAL_DIMENS._10,
    },
    title: {
        fontSize: FONT_SIZE._26, 
        fontWeight: FONT_WEIGHT._600,
        marginHorizontal: HORIZONTAL_DIMENS._20,
        marginTop: VERTICAL_DIMENS._10, 
        marginBottom: VERTICAL_DIMENS._10,
        color: colors.color_1F1F1F, 
    },
});