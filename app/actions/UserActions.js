import { userService } from '../services/user.service'

export const setLoggedInUser = (getLoggedInUser) => {
    return async (dispatch) => {
        const user = await userService.getLoggedInUser(getLoggedInUser);
        console.log(user);
        dispatch( {type: 'SET_USER', user});
    }
}
export const setContacts = (platform) => {
    return async (dispatch, getState) => {
        const contacts = await userService.getContacts(platform)
        dispatch({type: 'SET_CONTACTS', contacts})
    }

}