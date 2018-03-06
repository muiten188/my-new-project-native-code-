import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  changePassword: null,
  user: {}
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.USER_INFO:
      return {
        ...state,
        user: action.user
      };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: true
      };
    case types.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changePassword: false
      };
    case types.RESET_USER:
      return {
        ...initState
      };
    default:
      return state;
  }
}
