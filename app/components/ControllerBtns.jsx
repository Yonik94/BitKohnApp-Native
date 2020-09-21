import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Localization from 'expo-localization';

import { ControlBtn } from './controlBtn'
export const ControllerBtns = (props) => {
    const bgc = {
        send: '#d32733',
        ask: '#32ad42',
        edit: '#429ac8',
    }
    
    const source = {
        send: require('../assets/icons/send.png'),
        ask: require('../assets/icons/ask.png'),
        edit: require('../assets/icons/user.png'),
    }

    const navigateToContacts = () => {
        props.navigation.navigate('Contact')
    }
    return (
        <View style={styles.controllerBtnsContainer}>
            <TouchableWithoutFeedback onPress={navigateToContacts}>
                <ControlBtn text="Send Money" bgc={bgc.send} source={source.send}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <ControlBtn text="Ask Money" bgc={bgc.ask} source={source.ask}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <ControlBtn text="Edit Profile" bgc={bgc.edit} source={source.edit}/>
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
    }
})