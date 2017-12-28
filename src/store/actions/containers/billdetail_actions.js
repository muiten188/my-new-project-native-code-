import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function billPay(paymentItemList, bill, balance) {
  let dataPost = {};
  let _paymentItemList = [];
  let paymentItem = {};
  dataPost.accountBalance = balance;
  dataPost.apartmentId = bill.apartmentId;
  dataPost.invoiceId = bill.invoiceId;
  
  for (var i = 0; i < paymentItemList.length; i++) {
    paymentItem={}
    paymentItem.invoiceDetailId = paymentItemList[i].invoiceDetailId;
    paymentItem.paymentAmount = paymentItemList[i].invoiceDetailAmount;
    paymentItem.paymentMethod=paymentItemList[i].paymentMethod;
    _paymentItemList.push(paymentItem);
  }
  dataPost.paymentItemList = _paymentItemList;
  return dispatch => {
    dispatch(_billPaying());
    fetch(`${AppConfig.API_HOST}tablet/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataPost)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        if (responseJson) {
          // oFilmDetail = JSON.parse(responseJson.Data);
          dispatch(_billPay(responseJson));
        } else {
          //fail
        }
      });
  };
}

function _billPay(data) {
  return {
    type: types.BILL_PAY,
    transactionCode: data.transactionCode
  };
}

function _billPaying() {
  return {
    type: types.BILL_PAYING
  };
}
