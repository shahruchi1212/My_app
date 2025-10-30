import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ListItem from '../../components/Card/ListItem';
import { listService } from '../../redux/apis/list';
import { clearListError, resetListState } from '../../redux/features/list-slice';
import Layout from '../../components/layout';
import { HORIZONTAL_DIMENS, VERTICAL_DIMENS } from '../../constants/dimens';
import { colors, FONT_SIZE, FONT_WEIGHT } from '../../utils/theme';
import ListHeader from '../../components/Header/ListHeader';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../redux/features/auth-slice';

const ListScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { items, isLoading, isRefreshing, error, skip, limit, canLoadMore } = useSelector(state => state.list);

    useEffect(() => {
        if (items.length === 0 && !isLoading) {
            dispatch(listService({ skip: 0, limit }));
        }
    }, [dispatch, limit, items.length]); 

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error, [{ text: "OK", onPress: () => dispatch(clearListError()) }]);
        }
    }, [error, dispatch]);

    const handleLoadMore = useCallback(() => {
        if (!isLoading && canLoadMore && !isRefreshing) {
            dispatch(listService({ skip, limit }));
        }
    }, [isLoading, canLoadMore, skip, limit, isRefreshing, dispatch]);

    const handleRefresh = useCallback(() => {
        if (!isRefreshing) {
            dispatch(resetListState()); 
            dispatch(listService({ skip: 0, limit }));
        }
    }, [isRefreshing, limit, dispatch]);


    const renderFooter = () => {
        if (!isLoading || isRefreshing) return null;
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
        );
    };

    const renderEmpty = () => {
        if (!isLoading && !isRefreshing && items.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No items found. Pull down to refresh.</Text>
                </View>
            );
        }
        return null;
    };

    const handleLogout = useCallback(() => {
      dispatch(logoutUser()) 
  }, [dispatch]);

    const renderItem = ({ item }) => (
        <ListItem 
            item={item} 
            onPress={() => navigation.navigate('Details', { userId: item?._id, userName: item?.username })}
        />
    );

    return (
        <Layout isFrom={true}>
        <ListHeader headerText="List" />
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
                contentContainerStyle={items.length === 0 ? styles.listContentEmpty : styles.listContent} 
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5} 
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty} 
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={[colors.primary]} 
                    />
                }
            />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
        </Layout>
    );
};

export default ListScreen;

const styles = StyleSheet.create({

    listContent: {
        paddingHorizontal: HORIZONTAL_DIMENS._20,
        paddingBottom: VERTICAL_DIMENS._20, 
    },
    listContentEmpty: {
        flexGrow: 1, 
        paddingHorizontal: HORIZONTAL_DIMENS._20,
    },
    footerContainer: {
        paddingVertical: VERTICAL_DIMENS._20,
    },
    emptyContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%', 
    },
    emptyText: {
        fontSize: FONT_SIZE._16,
        color: colors.textSecondary,
        textAlign: 'center',
        padding: HORIZONTAL_DIMENS._20,
    },
    logoutButton: {
      paddingVertical: VERTICAL_DIMENS._10,
      paddingHorizontal: HORIZONTAL_DIMENS._10,
      borderRadius: 5,
      backgroundColor: colors.color_F5F5F5, 
      alignItems : "flex-end"
  },
  logoutText: {
      color: colors.error, 
      fontSize: FONT_SIZE._26,
      fontWeight: FONT_WEIGHT._800,
  }
});