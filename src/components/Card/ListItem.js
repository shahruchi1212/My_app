import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, FONT_SIZE, FONT_WEIGHT } from '../../utils/theme';
import { HORIZONTAL_DIMENS, VERTICAL_DIMENS } from '../../constants/dimens';
import { COMMON_IMAGES } from '../../constants/images';

const ListItem = ({ item, onPress }) => {
    const isPlaceholder = !item?.imageUrl;
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
        >
            <View style={styles.imagePlaceholder}>
            <Image 
                   source={item?.imageUrl ? { uri: item?.imageUrl } : COMMON_IMAGES.NoImage}
                   style={[
                       styles.image, 
                       isPlaceholder && styles.placeholderImageStyle
                   ]}
                />
            </View>

            <Text style={styles.nameText}>
                {item?.username || 'Name List - 1'} 
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface || colors.white,
        borderRadius: 10,
        paddingVertical: VERTICAL_DIMENS._16, 
        paddingHorizontal: HORIZONTAL_DIMENS._8,
        marginVertical: VERTICAL_DIMENS._8, 
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10,
    },
    imagePlaceholder: {
        width: 80, 
        height: 80,
        borderRadius: 8,
        backgroundColor: colors.borderColor, 
        marginHorizontal: HORIZONTAL_DIMENS._10,
        overflow: 'hidden',
        alignItems : "center",
        justifyContent:"center"
    },
    image: {
        width: '100%',
        height: '100%',
    },
    nameText: {
        fontSize: FONT_SIZE._20,
        fontWeight: FONT_WEIGHT._600,
        color: colors.color_263238,
        marginLeft: HORIZONTAL_DIMENS._10,
    },
    placeholderImageStyle: {
        resizeMode: 'cover', 
        width: '70',
        height: '70', 
    },
});

export default ListItem;