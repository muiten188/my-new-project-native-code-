import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import { AsyncStorage } from "react-native";
import { buildHeader, fetchCatch, _logout } from "../../../helper";
export function _getUser(user) {
  return {
    type: types.USER_INFO,
    user: user
  };
}
export function changePassword(value, user) {
  let dataPost = {};
  dataPost.oldPassword = value.password;
  dataPost.newPassword = value.newPassword;
  dataPost.userName = user.username;
  return dispatch => {
    fetch(`${AppConfig.API_HOST}tablet/change-password`, {
      method: "PUT",
      headers: Object.assign(
        {},
        {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        buildHeader(user)
      ),
      body: JSON.stringify(dataPost)
    })
      .then(function (response) {
        if (response.status == 401) {
          dispatch(_logout());
        }
        if (response.status != 200) {
          dispatch(changePasswordfail());
        }
        else if (response.status == 200) {
          dispatch(changePasswordSuccess());
        }
        else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        //debugger;
        //dispatch(changePasswordSuccess(responseJson));
      })
      .catch(function (error) {
        dispatch(changePasswordfail());
      });
  };
}

function changePasswordSuccess() {
  return {
    type: types.CHANGE_PASSWORD_SUCCESS
  };
}

function changePasswordfail() {
  return {
    type: types.CHANGE_PASSWORD_FAIL
  };
}
export function resetState(user) {
  return {
    type: types.RESET_USER,
  };
}