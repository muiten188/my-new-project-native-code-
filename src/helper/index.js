import { AsyncStorage } from "react-native";
import * as types from "../store/constants/action_types";

export function setAsyncStorage(key, value) {
    try {
        AsyncStorage.setItem(key, value);
    }
    catch (e) {
        alert('set error')
    }
}

export function getAsyncStorage(key, callback) {
    try {
        const hadUser = AsyncStorage.getItem(key)
            .then(callback)
            .done();
    } catch (error) {
        alert(error);
        // Error retrieving data
    }
}

export async function getUser() {
    try {
        const hadUser = await AsyncStorage.getItem("@user")
        return hadUser
    } catch (error) {
        alert(error);
        // Error retrieving data
    }
}

export function clearAsyncStorage() {
    try {
        AsyncStorage.clear();
    }
    catch (e) {
        alert('clear error')
    }
}   

export function buildHeader(user) {
    return {
        JSESSIONID:user.jSessionId
    }
}   

function _fetchCatch() {
    return {
      type: types.BILL_DETAIL_FETCH_CATCH,
    };
  }