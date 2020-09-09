import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet } from "react-native";
import { connect, useDispatch, useSelector, useStore } from 'react-redux'
import * as Contacts from 'expo-contacts';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { setContacts } from '../actions/UserActions';

import { Filter } from '../components/Filter'
import { ContactPreview } from '../components/ContactPreview'
export const _Contact = ({ navigation, setContacts }) => {
    const contacts = useSelector(state => state.contacts);
    const dispatch = useDispatch()
    // const state = useSelector(state => state)
    // // const [contacts, setContacts] = useState([]);
    const [contactsToShow, setContactsToShow] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');

    const filterContacts = (str) => {
        const filteredContacts = contacts.filter(contact => {
            return (
                contact.name.toLowerCase().includes(str.toLowerCase()) ||
                contact.phoneNumbers.some(phoneNumber => phoneNumber.number.includes(str))
            )
        })
        setContactsToShow(filteredContacts);
    }

    useEffect(() => {
        setContacts(Platform.OS)
    }, []);

    useEffect(() => {
        if (contacts) {
            setLoading(false);
        }
    }, [contacts])

    // useEffect(() => {
    //     filterContacts(filterText)
    // }, [filterText])

    useEffect(() => {
        contactsToShow.forEach(contact => {
            renderItem({ item: contact })
        })
    }, [contactsToShow])

    const renderItem = ({ item }) => {
        return (
            <ContactPreview item={item} navigation={navigation} />
        )
    }

    return (
        <View style={styles.contactScreen}>
            <LinearGradient
                style={{ flex: 1, width: '100%', paddingRight: 20, paddingLeft: 20 }}
                colors={['rgba(23,115,66,0.8)', 'rgba(44,124,157,0.8)']}
                start={[0.4, 0.6]}
                end={[0.7, 1]}
            >
                <Filter setFilterText={setFilterText} />
                {isLoading && <Text style={styles.text}>Loading...</Text>}
                {!isLoading && <FlatList
                    data={filterText ? contactsToShow : contacts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => (
                        <View>
                            <Text style={styles.text}>
                                Contacts didn't found
                            </Text>
                        </View>
                    )}

                />}
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    contactScreen: {
        flex: 1,
        backgroundColor: `transparent`,
    },
    contact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: 'white',
        borderTopWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})

const mapStateProps = state => {
    if (state && state.user && state.user.contacts) {
        return {
            contacts: state.user.contacts
        }
    } else {
        return { contacts: state }
    }
}
const mapDispatchToProps = {
    setContacts
}

export const Contact = connect(mapStateProps, mapDispatchToProps)(_Contact);
// if (contacts.length > 0) return;
        // (async () => {
        //     if (Platform.OS !== 'android') return
        //     const { status } = await Contacts.requestPermissionsAsync();
        //     if (status === 'granted') {
        //         const { data } = await Contacts.getContactsAsync({
        //             fields: [Contacts.Fields.PhoneNumbers],
        //         });
        //         const contactsToUpdate = [];
        //         if (data.length > 0) {
        //             data.forEach(contact => {
        //                 if (contact.phoneNumbers && contact.phoneNumbers[0].number) {
        //                     contactsToUpdate.push(contact)
        //                 }
        //             });
        //             setContacts(contactsToUpdate);
        //         }
        //     }
        // })();