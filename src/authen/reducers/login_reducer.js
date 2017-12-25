import * as types from "../../store/constants/action_types";
const initState = {
  Logged: null,
  Loging: false
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        Logged: action.Logged,
        user:action.user,
        Loging: false,
        action
      };
    case types.LOGIN_EROR:
      return {
        ...state,
        Logged: action.Logged,
        Loging: false,
        action
      };
    case types.LOGIN:
      return {
        ...state,
        Loging: action.Loging,
        action
      };
    default:
      return state;
  }
}
