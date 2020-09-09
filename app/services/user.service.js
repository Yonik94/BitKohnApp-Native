import { utilService } from './util.service';
import { AsyncStorage } from 'react-native';
import * as Contacts from 'expo-contacts';

const users = [
    {
        "_id": '123',
        "firstName": 'Yoni',
        "lastName": 'Kohn',
        "phoneNumber": '0506464848',
        "password": '1234',
        "transactions": [],
        "amount": 200,
        "contacts": [],
        "isRegister": true
    }
]
export const userService = {
    getUser,
    login,
    createUser,
    getUserById,
    makeTransfer,
    getContacts,
    getLoggedInUser
}

function getUser(phone) {
    const user = users.find(currUser => currUser.phoneNumber === phone);
    return new Promise((resolve) => {
        (user && user.isRegister) ? resolve(user) : resolve(false)
    })
}

async function login(user) {
    const currUser = await getUser(user.phone);
    if (currUser && user.password === currUser.password) {
        console.log({currUser});
        await AsyncStorage.setItem('loggedInUser', currUser._id);
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

async function createUser(user, isRegister, isLogin) {
    let regUser = await getUser(user.phone);
    if (regUser) {
        regUser.firstName = user.password,
            regUser.lastName = user.password,
            regUser.password = user.password,
            regUser.isRegister = isRegister
    } else {
        regUser = {
            "_id": utilService.makeId(),
            "firstName": user.firstName,
            "lastName": user.lastName,
            "phoneNumber": user.phone,
            "password": user.password,
            "transactions": [],
            "amount": 100,
            "contacts": [],
            "isRegister": isRegister
        }
        users.push(regUser);
    }
    if (isLogin) AsyncStorage.setItem('loggedInUser', regUser._id);
    console.log({ regUser });
    return Promise.resolve(regUser);
}

function getUserById(id) {
    const user = users.find(currUser => currUser._id === id);
    if (user) {
        return Promise.resolve(user);
    }
}

async function makeTransfer(userId, amount, contact) {
    console.log({ contact });
    let toUser = await getUser(contact.phone);
    const fromUser = await getUserById(userId);
    if (fromUser.amount < amount) return Promise.reject(`Transfer up to $${fromUser.amount}`)
    if (!toUser) {
        const user = { phone: contact.phone, firstName: '', lastName: '', password: '' }
        toUser = await createUser(user, false, false);
    }
    toUser.amount += amount;
    fromUser.amount -= amount;
    addTransaction(fromUser._id, contact, amount);
}

async function addTransaction(fromUserId, contact, amount) {
    const fromUser = await getUserById(fromUserId)
    const toUser = await getUser(contact.phone)
    const newTrans = {
        "_id": utilService.makeId(),
        "from": `${fromUser.firstName} ${fromUser.lastName}`,
        "to": contact.phone,
        "toContactName": contact.name,
        amount,
        "at": Date.now(),
        isConfirmed: false
    }
    fromUser.transactions.push(newTrans)
    toUser.transactions.push(newTrans)
}

async function getContacts(platform) {
    if (platform !== 'android') return []
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
            const contacts = data.filter(contact => contact.phoneNumbers && contact.phoneNumbers[0].number);
            return contacts
        }
    }
}

async function getLoggedInUser(getLoggedInUser) {
    const user = await getLoggedInUser('loggedInUser')
    console.log({user});
    return user ? user : undefined

}