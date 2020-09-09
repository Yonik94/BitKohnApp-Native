import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const ControllerBtns = (props) => {

    const navigateToContacts = () => {
        props.navigation.navigate('Contact')
    }
    const navigateToTransfer = () => {
        props.navigation.navigate('Transfers')
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={navigateToContacts}>
                <View style={styles.sendMoney}>
                    <View style={styles.sendMoneyImage}>
                        <Image style={styles.sendIcon} source={require('../assets/icons/send.png')} />
                    </View>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Send</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={navigateToTransfer}>
                <View style={styles.sendMoney}>
                    <View style={styles.sendMoneyImage}>
                        <Image style={styles.sendIcon} source={require('../assets/icons/send.png')} />
                    </View>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Transfer</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    sendMoney: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendMoneyImage: {
        backgroundColor: '#d32733',
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
    },
    sendIcon: {
        width: 20,
        height: 20,
    }
})