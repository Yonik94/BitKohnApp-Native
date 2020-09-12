import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

//Import services
import { userService } from '../services/user.service';
import { setLoggedInUser } from '../actions/UserActions';
import { NextBtn } from '../components/NextBtn';


//Import components:
import { PersonalDetailsRegister } from '../components/PersonalDetailsRegister';
import { NumberInput } from '../components/NumberInput';
import { BackBtn } from '../components/BackBtn'
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

    useEffect(() => {
        if (!isOnPassword && value.length === 10) {
            onNextBtn()
        } else if (isOnPassword && value.length === 4) {
            setUser({ ...user, password: value });
        }
    }, [value])

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

    const goBack = () => {
        if (isOnPersonalDetails) {
            setIsPersonal(false);
            setIsPassword(true);
        } else if (isOnPassword && !isOnPersonalDetails) {
            setIsPassword(false);
        }
    } 

    const title = () => {
        let title = ''
        if (isOnPassword && !isOnPersonalDetails) {
            title = 'Enter your password'
        }else if (!isOnPassword && !isOnPersonalDetails) {
            title = 'Enter your phone number'
        } else if (isOnPersonalDetails) {
            title = 'Enter your personal details'
        }
        return title
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <LinearGradient
                style={[{
                    flex: 1,
                    paddingVertical: 20,
                }, styles.root]}
                colors={['rgba(54,106,146,0.8)', 'rgba(100,60,170,0.6)']}
                start={[0.5, 0.7]}
                end={[0.7, 1]}>
           {(isOnPassword || isOnPersonalDetails) && <BackBtn goBack={goBack}/>}
            <View>
            <Text style={styles.title}>{ title() }</Text>
            </View>
            {!isOnPersonalDetails && <View style={{marginBottom: 50}}>
                {!isOnPassword && !isOnPersonalDetails && <NumberInput
                isSecure={false}
                cellsCount={10}
                setValue={setValue} />}
                {isOnPassword && !isOnPersonalDetails && <NumberInput
                    isSecure={true}
                    cellsCount={4}
                    setValue={setValue} />}
            </View>}
            {!isOnPersonalDetails && <View style={{ alignItems: 'center' }}>
                <NextBtn onPress={onNextBtn} />
            </View>}
            {isOnPersonalDetails && <PersonalDetailsRegister newAccount={createNewAcount} />}
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: { textAlign: 'center', fontSize: 30, marginVertical: 50, color: 'white' },
})