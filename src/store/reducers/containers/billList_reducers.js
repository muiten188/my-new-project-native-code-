import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  balance:-1
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.BILL_LIST:
      return {
        ...state,
        listResult: action.listResult,
        isLoading: false
      };
    case types.BILL_LISTING:
      return {
        ...state,
        isLoading: true
      };
    case types.BALANCE:
      return {
        ...state,
        balance:action.balance
      };
    default:
      return state;
  }
}
