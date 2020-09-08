import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";

export const MainHeader = (props) => {
    const menuTouchHandler = () => {
        props.openCloseMenu(true)
    }
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.logo}>BitKohn</Text>
            <TouchableWithoutFeedback onPress={menuTouchHandler}>
            <Image style={styles.hamburgerMenu}
            source={require('../assets/icons/open-menu.png')}/>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E9FFF9',
        width: '100%',
        paddingStart: 10,
        paddingEnd: 10,
    },
    hamburgerMenu: {
        height: 50,
        width: 50,
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        }
})