import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  balance: 200000,
  totalDebit: 0,
  billError: false,
  listResult:[]
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.BILL_LIST:
      return {
        ...state,
        listResult: action.listResult,
        isLoading: false,
        billError: initState.billError
      };
    case types.BILL_LISTING:
      return {
        ...state,
        isLoading: true,
        billError: initState.billError
      };
    case types.BALANCE:
      return {
        ...state,
        billError: initState.billError,
        // balance:action.balance,
        balance: action.balance == null ? initState.balance : action.balance,
        totalDebit:
          action.totalDebit == null ? initState.totalDebit : action.totalDebit
      };
    case types.LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        billError: true
      };
    case types.FETCH_CATCH:
      return {
        ...state,
        isLoading: false,
        billError: true
      };
    case types.LIST_RESET:
      return {
        ...state,
        ...initState
      };
    default:
      return state;
  }
}
