import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  balance:200000,
  totalDebit:0
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
        // balance:action.balance,
        balance:action.balance==null?initState.balance:action.balance,
        totalDebit:action.totalDebit==null?initState.totalDebit:action.totalDebit
      };
    default:
      return state;
  }
}
