import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function getUser() {
  let data = [];
  let dataPost = values || {};
  // dispatch(_search());
  return dispatch => {
    fetch(`${AppConfig.API_HOST}tablet/apartment`, {
      method: "GET"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        debugger;
        if (responseJson.data) {
          data = responseJson.data;
          dispatch(_search(data));
        } else {
          dispatch(_search(data));
        }
      });
  };
}
export function _getUser(user){
    return {
        type: types.USER_INFO,
        user: user
      };
 }