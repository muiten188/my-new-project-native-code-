import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function search(values) {
  let data = [];
  let dataPost = values || {};
  return dispatch => {
    dispatch(_searching());
    fetch(`${AppConfig.API_HOST}tablet/apartment?${getQueryString(dataPost)}`, {
      method: "GET",
      qs:dataPost
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        if (responseJson.data) {
          data = responseJson.data;
          dispatch(_search(data));
        } else {
          dispatch(_search(data));
        }
      });
  };
}

function _search(data) {
  return {
    type: types.LIST_RESULT,
    data: data,
    isLoading:false
  };
}

function _searching(){
  return {
    type: types.SEARCHING,
    isLoading: true
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