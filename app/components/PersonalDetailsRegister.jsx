import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';

export const PersonalDetailsRegister = (props) => {
    const [userDetails, setDetails] = useState({firstName: '', lastName: ''});
    return (
        <View style={{paddingHorizontal: 20}}>
            <TextInput
            value={userDetails.firstName}
            placeholder={'First Name'}
            onChangeText={text => setDetails({...userDetails, firstName: text})}
            />
            <TextInput
            value={userDetails.lastName}
            placeholder={'Last Name'}
            onChangeText={text => setDetails({...userDetails, lastName: text})}
            />
            <TouchableNativeFeedback onPress={() => props.newAccount(userDetails.firstName, userDetails.lastName)}>
                <View>
                    <Text>Create my new account</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}