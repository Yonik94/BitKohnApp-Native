import React, { useState } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as SMS from 'expo-sms';

import { userService } from '../services/user.service'
export const Transfers = ({ route, navigation }) => {
    const contactName = route.params.contact.name;
    const [amount, setAmount] = useState('');
    const [password, setPassword] = useState('');
    const [isOnConfirm, setConfirmation] = useState(false);
    const makeTransfer = async () => {
        if (!isOnConfirm) {
            if (amount) {
                setConfirmation(true);
            }else {
                alert('Enter amount');
            }
        } 
        else {
            const userId = await AsyncStorage.getItem('loggedInUser');
            try {
                await userService.makeTransfer(userId, parseInt(amount).toFixed(2), route.params.contact);
                await sendSMS()
                navigation.navigate('Home');
            } catch (err) {
                setAmount('');
                setPassword('');
                setConfirmation(false);
                alert(err);
            }
        }
    }
    const sendSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const {result } = await SMS.sendSMSAsync(
                [route.params.contact.phone],
                `Hi ${route.params.contact.name},
                you got $${amount} in BitKohn App.
                Please download the app and confirm the transfer.
                If you'll don't confirm it in 72 hours the tranfer will be cancel automatically.
                For downlaod: https://expo.io/@yonik94/bitkohnApp
                `
            )
            console.log(result);
        }
    }
    return (
        <View style={styles.transferScreen}>
            <LinearGradient
                style={{ flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 20, 
                    alignItems: 'center' }}
                colors={['rgba(54,106,146,0.8)', 'rgba(100,60,170,0.6)']}
                start={[0.5, 0.7]}
                end={[0.7, 1]}>
                {!isOnConfirm &&
                    <View>
                        <Text style={styles.text}>Transfer to {contactName}</Text>
                        <Text style={styles.text}>How much?</Text>
                        <TextInput
                            value={amount}
                            keyboardType={"number-pad"}
                            autoFocus={true}
                            placeholder={`0.00`}
                            style={styles.textInput}
                            caretHidden={true}
                            
                            onChangeText={text => setAmount(text)}></TextInput>
                        <TouchableNativeFeedback onPress={makeTransfer}>
                            <Text style={[styles.text, styles.button]}>Make a transfer</Text>
                        </TouchableNativeFeedback>
                    </View>}
                {isOnConfirm &&
                    <View>
                        <Text style={styles.text}>Confirm your transfer of ${amount} to {contactName}</Text>
                        <TextInput
                            value={password}
                            keyboardType={"number-pad"}
                            maxLength={4}
                            autoFocus={true}
                            secureTextEntry={true}
                            style={styles.textInput}
                            caretHidden={true}
                            placeholder={'Enter your password'}
                            placeholderTextColor={'white'}
                            onChangeText={text => setPassword(text)}></TextInput>
                        <TouchableNativeFeedback onPress={makeTransfer}>
                            <Text style={styles.text}>Confirm transfer</Text>
                        </TouchableNativeFeedback>
                    </View>}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    transferScreen: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    textInput: {
        color: 'white',
        fontSize: 18,
        marginBottom: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        fontSize: 30
    },
    button: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'rgb(0,80,130)',
        paddingVertical: 5,
        textAlign: 'center',
        marginBottom: 20,
        }
})