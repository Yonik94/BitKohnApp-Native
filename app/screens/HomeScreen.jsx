//Importing needed modules:
import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, AsyncStorage } from 'react-native';

//Importing components:
import { ControllerBtns } from '../components/ControllerBtns'
import { Transactions } from '../components/Transactions'
import { userService } from '../services/user.service';
import { TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const HomeScreen = (props) => {
    const [username, setUsername] = useState({});
    const [transactions, setTransactions] = useState();

    useEffect(() => {
        (async () => {
            const userId = await AsyncStorage.getItem('loggedInUser');
            const loggedInUser = await userService.getUserById(userId);
            setUsername({ ...username, firstName: loggedInUser.firstName, lastName: loggedInUser.lastName });
            setTransactions(loggedInUser.transactions);
        })()
    })
    return (
        <View style={styles.homeScreen}>
            <View style={styles.headerContainer}>
                    <View style={styles.profileContainer}>
                        <Text style={styles.text}>
                            Welcome {username.firstName} {username.lastName}
                        </Text>
                        <TouchableNativeFeedback>
                            <Text style={styles.text}>
                                Show your profile
                        </Text>
                        </TouchableNativeFeedback>
                    </View>
                    <TouchableNativeFeedback>
                        <Text style={styles.text}>
                            settings
                    </Text>
                    </TouchableNativeFeedback>
            </View>
            <View style={styles.controllerBtns}>
                <ControllerBtns navigation={props.navigation} />
            </View>
            <View style={styles.transactions}>
                <Transactions transactions={transactions} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'linear-gradient(90deg, rgba(26,128,133,1) 27%, rgba(40,117,137,1) 79%)',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    controllerBtns: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'linear-gradient(90deg, rgba(26,128,133,1) 27%, rgba(40,117,137,1) 79%)',
    },
    transactions: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'linear-gradient(90deg, rgba(10,107,123,1) 24%, rgba(44,82,129,1) 43%)',
    }
})