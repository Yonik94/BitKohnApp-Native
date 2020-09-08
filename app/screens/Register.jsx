import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

//Import services
import { userService } from '../services/user.service';

//Import components:
import { PersonalDetailsRegister } from '../components/PersonalDetailsRegister'



const _Register = ({ navigation, store }) => {
    const [isOnPassword, setIsPassword] = useState(false);
    const [isOnPersonalDetails, setIsPersonal] = useState(false);
    const CELL_COUNT = isOnPassword ? 4 : 10;
    const [enableMask, setEnableMask] = useState(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [user, setUser] = useState({})
    const toggleMask = () => setEnableMask(f => !f);

    (async () => {
        const loggedInUser = await AsyncStorage.getItem('loggedInUser')
        loggedInUser ? navigation.navigate('Home') : navigation.navigate('Register');
      })()

    useEffect(() => {
        (async () => {

            if (!isOnPassword && !isOnPersonalDetails && value.length === 10) {
                setIsPassword(true);
                setEnableMask(true);
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
                setEnableMask(false);
                setValue('');
            } else if (user.firstName && user.lastName) {
                userService.createUser(user, true, true);
                navigation.navigate('Home');
            }
        })()
    }, [user])
    const onGoToNextBtn = () => {
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

    const renderCell = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = enableMask ? '•' : symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }
        return (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {textChild}
            </Text>
        );
    };

    return (
        <SafeAreaView style={styles.root}>
            {isOnPassword && !isOnPersonalDetails &&
                <Text style={styles.title}>Enter your password</Text>}
            {!isOnPassword && !isOnPersonalDetails &&
                <Text style={styles.title}>Enter your phone number</Text>}
            {isOnPersonalDetails &&
                <Text style={styles.title}>Enter your personal details</Text>}
            {!isOnPersonalDetails && <View style={styles.fieldRow}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />
                {isOnPassword && <Text style={styles.toggle} onPress={toggleMask}>
                    {enableMask ? '🙈' : '🐵'}
                </Text>}
            </View>}
            {!isOnPersonalDetails && <TouchableNativeFeedback onPress={onGoToNextBtn}>
                <View style={styles.verificationBtn}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Next</Text>
                </View>
            </TouchableNativeFeedback>}
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
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        width: 30,
        height: 30,
        lineHeight: 30,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 8,
        borderRadius: 6,
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggle: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 24,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    verificationBtn: {
        padding: 20,
        backgroundColor: '#d32733',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
//     const [isOnPassword, setAsPassword] = useState(true)
//     const CELL_COUNT = isOnPassword ? 4 : 10;
//     const [value, setValue] = useState('');
//     const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
//     const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//         value,
//         setValue,
//     });
//     return (
//         <SafeAreaView style={styles.root}>
//             {isOnPassword && <Text style={styles.title}>Enter your paswword</Text>}
//             {!isOnPassword && <Text style={styles.title}>Enter your phone number</Text>}
//             <CodeField
//                 ref={ref}
//                 {...props}
//                 value={value}
//                 onChangeText={setValue}
//                 cellCount={CELL_COUNT}
//                 rootStyle={styles.codeFieldRoot}
//                 keyboardType="number-pad"
//                 textContentType="oneTimeCode"
//                 secureTextEntry
//                 renderCell={({ index, symbol, isFocused }) => (
//                     <Text
//                         key={index}
//                         style={[styles.cell,
//                         isFocused && styles.focusCell]}
//                         onLayout={getCellOnLayoutHandler(index)}>
//                         {symbol || (isFocused ? <Cursor /> : null)}
//                     </Text>
//                 )}
//             />
//             <TouchableNativeFeedback>
//                 <View style={styles.verificationBtn}>
//                     <Text style={{ fontSize: 20, color: 'white' }}>Send me verification message</Text>
//                 </View>
//             </TouchableNativeFeedback>
//         </SafeAreaView>
//     )
// }
// const styles = StyleSheet.create({
//     root: { flex: 1, padding: 20, justifyContent: 'space-around', alignItems: 'center' },
//     title: { textAlign: 'center', fontSize: 30, marginBottom: 30, },
//     // codeFieldRoot: { marginTop: 20 },
//     cell: {
//         width: 30,
//         height: 40,
//         lineHeight: 38,
//         fontSize: 24,
//         borderBottomWidth: 2,
//         borderColor: '#00000030',
//         textAlign: 'center',
//         marginBottom: 100,
//     },
//     focusCell: {
//         borderColor: '#000',
//     },
// verificationBtn: {
//     padding: 20,
//     backgroundColor: '#d32733',
//     justifyContent: 'center',
//     alignItems: 'center'
// }
// });

const mapStateProps = state => {
    return {
        state
    }
}

export const Register = connect(mapStateProps)(_Register);