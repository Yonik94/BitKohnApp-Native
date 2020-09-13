import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Localization from 'expo-localization';

export const ControllerBtns = (props) => {

    const navigateToContacts = () => {
        props.navigation.navigate('Contact')
    }
    return (
        <View style={styles.controllerBtnsContainer}>
            <TouchableWithoutFeedback onPress={navigateToContacts}>
                <View style={styles.btnContainer}>
                    <View style={[styles.iconContainer, {backgroundColor: '#d32733'}]}>
                        <Image style={[styles.icon, {left: '20%'} ]} source={require('../assets/icons/send.png')} />
                    </View>
                    <Text style={styles.text}>Send Money</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <View style={styles.btnContainer}>
                    <View style={[styles.iconContainer, {backgroundColor: '#32ad42'}]}>
                        <Image style={[styles.icon, {left: '25%'}]} source={require('../assets/icons/ask.png')} />
                    </View>
                    <Text style={styles.text}>Ask Money</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <View style={styles.btnContainer}>
                    <View style={[styles.iconContainer, {backgroundColor: '#429ac8'}]}>
                        <Image style={styles.icon} source={require('../assets/icons/user.png')} />
                    </View>
                    <Text style={styles.text}>Edit Profile</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    controllerBtnsContainer: {
        width: '100%',
        flexDirection: Localization.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        height: 80,
    },
    btnContainer: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        position: 'relative'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Rubik-Medium',
    },
    icon: {
        width: 20,
        height: 20,
        position: 'absolute',
    }
})