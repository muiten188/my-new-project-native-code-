import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  transactionCode:null
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.BILL_PAY:
      return {
        ...state,
        isLoading: false,
        transactionCode:action.transactionCode
      };
    case types.BILL_PAYING:
      return {
        ...state,
        isLoading: true,
        transactionCode:null
      };
    default:
      return state;
  }
}
