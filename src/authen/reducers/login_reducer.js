import * as types from "../../store/constants/action_types";
const initState = {
  Logged: null,
  Loging: false,
  logout: false,
  user: {}
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        Logged: action.Logged,
        user: action.user,
        Loging: false,
        Logout: initState.logout,
        action
      };
    case types.LOGIN_EROR:
      return {
        ...state,
        Logged: action.Logged,
        Loging: false,
        Logout: initState.logout,
        action
      };
    case types.LOGIN:
      return {
        ...state,
        Loging: action.Loging,
        Logout: initState.logout,
        action
      };
    case types.LOGGED_OUT:
      return {
        ...state,
        Logged: null,
        Loging: false,
        Logout: true,
        action
      };
    default:
      return state;
  }
}
