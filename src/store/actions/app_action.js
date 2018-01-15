import * as types from "../constants/action_types";
import * as AppConfig from "../../config/app_config";

export function _getUser(user) {
  return {
    type: types.USER_INFO,
    user: user
  };
}

export function closePayInfo() {
  return {
    type: types.CLOSE_PAYINFO
  };
}

export function showPayInfo() {
  return {
    type: types.SHOW_PAYINFO
  };
}

export function getPayInfo(startDate,endDate,user){
  return dispatch=>{
    dispatch(_getingPayInfo());
    setTimeout(()=>dispatch(_listPayInfo([])),700)
  }
}

function _getingPayInfo(){
  return {
    type: types.LISTING_PAY_INFO
  };
}

function _listPayInfo(listPayInfo){
  return {
    type: types.LIST_PAY_INFO,
    listPayInfo:listPayInfo,
  };
}