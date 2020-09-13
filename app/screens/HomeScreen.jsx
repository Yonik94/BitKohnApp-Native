//Importing needed modules:
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import * as Localization from 'expo-localization';
import { LinearGradient } from 'expo-linear-gradient';

//Importing components:
import { ControllerBtns } from '../components/ControllerBtns'
import { Transactions } from '../components/Transactions'
import { userService } from '../services/user.service';
import { MainHeader } from '../components/MainHeader';
import { useSelector } from 'react-redux';

export const HomeScreen = (props) => {
    const [username, setUsername] = useState({});
    const transactions = useSelector(state => state.transactions)
    // const [transactions, setTransactions] = useState();
    useEffect(() => {
        (async () => {
            const userId = await AsyncStorage.getItem('loggedInUser');
            const loggedInUser = await userService.getUserById(userId);
            setUsername({ ...username, firstName: loggedInUser.firstName, lastName: loggedInUser.lastName });
        })()
    }, [])
    return (
        <View style={styles.homeScreen}>
            <LinearGradient
                colors={['rgba(40,117,160,1)', 'rgba(26,128,133,1)']}
                start={[0.7, 0.1]}
                end={[0.9, 1]}
            >
                <MainHeader />
                <View style={styles.headerContainer}>
                    <View style={styles.profileContainer}>
                        <Text style={styles.text}>
                            Welcome {username.firstName} {username.lastName}
                        </Text>
                    </View>
                    <TouchableNativeFeedback>
                        <Image style={styles.settingsIcon} source={require('../assets/icons/settings.png')} />
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.controllerBtns}>
                    <ControllerBtns navigation={props.navigation} />
                </View>
            </LinearGradient>
            <LinearGradient
                style={{ flex: 1, width: '100%', paddingRight: 20, paddingLeft: 20 }}
                colors={['rgba(10,107,123,0.9)', 'rgba(44,82,120,0.9)']}
                start={[0.9, 0.1]}
                end={[1, 1]}
            >
                <View style={styles.transactions}>
                    <Transactions transactions={transactions} />
                </View>
            </LinearGradient>
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
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rubik-SemiBold'
    },
    headerContainer: {
        flexDirection: Localization.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    controllerBtns: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    transactions: {
        flex: 1,
    },
    settingsIcon: {
        width: 30,
        height: 30,
    },
})