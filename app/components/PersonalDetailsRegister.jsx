import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';

export const PersonalDetailsRegister = (props) => {
    const [userDetails, setDetails] = useState({firstName: '', lastName: ''});
    return (
        <View style={{paddingHorizontal: 20}}>
            <TextInput
            style={styles.textInput}
            value={userDetails.firstName}
            placeholder={'First Name'}
            placeholderTextColor={'white'}
            onChangeText={text => setDetails({...userDetails, firstName: text})}
            />
            <TextInput
            style={styles.textInput}
            value={userDetails.lastName}
            placeholder={'Last Name'}
            placeholderTextColor={'white'}
            onChangeText={text => setDetails({...userDetails, lastName: text})}
            />
            <TouchableNativeFeedback onPress={() => props.newAccount(userDetails.firstName, userDetails.lastName)}>
                <View>
                    <Text style={styles.btnText}>Create my new account</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 10,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontSize: 20
        
    }
})