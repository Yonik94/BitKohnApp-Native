import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage } from "react-native";

//Import services
import { userService } from '../services/user.service';
import { setLoggedInUser } from '../actions/UserActions';
import { NextBtn } from '../components/NextBtn';


//Import components:
import { PersonalDetailsRegister } from '../components/PersonalDetailsRegister';
import { NumberInput } from '../components/NumberInput'
export const Register = ({ navigation }) => {
    const dispatch = useDispatch()
    const [isOnPassword, setIsPassword] = useState(false);
    const [isOnPersonalDetails, setIsPersonal] = useState(false);

    //Login / Register settings and state:
    const [value, setValue] = useState('');
    const [user, setUser] = useState({});
    const loggedInUser = useSelector(state => state.loggedInUser);

    // const getLoggedInUser = AsyncStorage.getItem;
    dispatch(setLoggedInUser(AsyncStorage.getItem))
        .then(loggedInUser ?
            navigation.navigate('Home') : navigation.navigate('Register'));

    useEffect(() => {
        (async () => {
            if (!isOnPassword && !isOnPersonalDetails && value.length === 10) {
                setIsPassword(true);
                setValue('');
            } else if (isOnPassword && !isOnPersonalDetails && value.length === 4) {
                const isRegistered = await userService.getUser(user.phone);
                if (isRegistered) {
                    const isValidate = await userService.login(user);
                    isValidate ? navigation.navigate('Home') : console.log('error');
                } else {
                    setIsPersonal(true);
                }
                setIsPassword(false);
                setValue('');
            } else if (user.firstName && user.lastName) {
                userService.createUser(user, true, true);
                navigation.navigate('Home');
            }
        })()
    }, [user])

    const onNextBtn = () => {
        if (!isOnPassword && value.length === 10) {
            setUser({ ...user, phone: value });
        } else if (isOnPassword && value.length === 4) {
            setUser({ ...user, password: value });
        } else {
            isOnPassword ? alert('Enter 4 digits for passsword') :
                alert('Enter phone number with 10 digits')
        }
    }

    const createNewAcount = (firstName, lastName) => {
        setUser({ ...user, firstName, lastName });
    }

    return (
        <SafeAreaView style={styles.root}>
            {isOnPassword && !isOnPersonalDetails &&
                <Text style={styles.title}>Enter your password</Text>}
            {!isOnPassword && !isOnPersonalDetails &&
                <Text style={styles.title}>Enter your phone number</Text>}
            {isOnPersonalDetails &&
                <Text style={styles.title}>Enter your personal details</Text>}
            {!isOnPersonalDetails && <View style={styles.fieldRow}>
            {!isOnPassword && !isOnPersonalDetails && <NumberInput
                isSecure={ false }
                cellsCount={ 10 }
                setValue={setValue} />}
                {isOnPassword && !isOnPersonalDetails &&<NumberInput
                isSecure={true}
                cellsCount={4}
                setValue={setValue} />}
            </View>}
            {!isOnPersonalDetails && <NextBtn onPress={onNextBtn}/>}
            {isOnPersonalDetails && <PersonalDetailsRegister newAccount={createNewAcount} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1, justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    title: { textAlign: 'center', fontSize: 30 },
})