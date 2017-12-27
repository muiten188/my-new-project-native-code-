import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

function getBalance(apartmentId, dispatch) {
  let apartmentIdParam = apartmentId || -1;
  fetch(
    `${
      AppConfig.API_HOST
    }tablet/apartment/${apartmentIdParam}/account-balance/`,
    {
      method: "GET"
    }
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJson) {
      let balance = responseJson.accountBalance;
      let totalDebit = responseJson.totalDebit;
      if (balance !== undefined) {
        dispatch(_balance(balance, totalDebit));
      } else {
        //fail
      }
    });
}

export function getBillList(apartmentId) {
  let apartmentIdParam = apartmentId || -1;
  return dispatch => {
    dispatch(_billListing());
    getBalance(apartmentIdParam, dispatch);
    fetch(
      `${AppConfig.API_HOST}tablet/invoice/?${getQueryString({
        aparmentId: apartmentIdParam
      })}`,
      {
        method: "GET"
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        let billList = responseJson.data;
        if (billList) {
          dispatch(_billList(billList));
        } else {
          //fail
        }
      });
  };
}

function _balance(balance, totalDebit) {
  return {
    type: types.BALANCE,
    balance: balance,
    totalDebit: totalDebit
  };
}

function _billList(billList) {
  return {
    type: types.BILL_LIST,
    listResult: billList
  };
}

function _billListing() {
  return {
    type: types.BILL_LISTING,
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
