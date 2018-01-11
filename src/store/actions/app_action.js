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
