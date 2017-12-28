import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function getHistory(apartmentId,currentTime) {
  let apartmentIdParam = apartmentId || -1;
  let _currentTime=currentTime||"";
  return dispatch => {
    dispatch(_historying());
    
    fetch(
      `${AppConfig.API_HOST}tablet/?${getQueryString({
        apartmentId: apartmentIdParam,
        month:_currentTime
      })}`,
      {
        method: "GET"
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        let historyList = responseJson.data;
        if (historyList) {
          dispatch(_history(historyList));
        } else {
          //fail
        }
      });
  };
}
function _historying() {
  return {
    type: types.HISTORYING,
    isLoading: true
  };
}
function _history(historyList) {
  return {
    type: types.HISTORY,
    listResult:historyList
  };
}

function getQueryString(params) {
  return Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join("&");
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
}
