import { utilService } from './util.service';
import { AsyncStorage } from 'react-native';
import * as Contacts from 'expo-contacts';

const gUsers = [
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
    getLoggedInUser,
    getTransactions
}

async function getUser(phone) {
    let users = await AsyncStorage.getItem('users');
    users = JSON.parse(users);
    if (!users) users = gUsers
    const user = users.find(currUser => currUser.phoneNumber === phone);
    return new Promise((resolve) => {
        (user && user.isRegister) ? resolve(user) : resolve(false)
    })
}

async function login(user) {
    const currUser = await getUser(user.phone);
    if (currUser && user.password === currUser.password) {
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
        gUsers.push(regUser);
    }
    const users = JSON.stringify(gUsers)
    await AsyncStorage.setItem('users', users);
    await AsyncStorage.setItem('loggedInUser', regUser._id);
    return Promise.resolve(regUser);
}

async function getUserById(id) {
    let users = await AsyncStorage.getItem('users');
    users = JSON.parse(users)
    console.log({ users });
    if (!users) users = gUsers
    const user = users.find(currUser => currUser._id === id);
    if (user) {
        return Promise.resolve(user);
    }
}

async function makeTransfer(userId, amount, contact) {
    let toUser = await getUser(contact.phone);
    const fromUser = await getUserById(userId);
    if (fromUser.amount < amount) return Promise.reject(`Transfer up to $${fromUser.amount}`)
    if (!toUser) {
        const user = { phone: contact.phone, firstName: '', lastName: '', password: '' }
        toUser = await createUser(user, false, false);
    }
    toUser.amount += amount;
    fromUser.amount -= amount;
    addTransaction(fromUser._id, toUser._id, contact.name, amount);
}

async function addTransaction(fromUserId, toUserId, name, amount) {
    const fromUser = await getUserById(fromUserId)
    const toUser = await getUserById(toUserId)
    const newTrans = {
        "_id": utilService.makeId(),
        "from": `${fromUser.firstName} ${fromUser.lastName}`,
        "to": toUser.phone,
        "toContactName": name,
        amount,
        "at": Date.now(),
        isConfirmed: false
    }
    fromUser.transactions.push(newTrans)
    toUser.transactions.push(newTrans)
}

async function getContacts(platform) {
    if (platform == 'web') return []
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
    return user ? user : undefined
}

async function getTransactions(id) {
    const user = await getUserById(id);
    return user ? Promise.resolve(user.transactions) : Promise.reject('err')
}