import * as types from "../constants/action_types";
const initState = {
  isLoading: false,
  showPayInfo: false,
  listPayInfo: []
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.CLOSE_PAYINFO:
      return {
        ...state,
        isLoading: initState.isLoading,
        showPayInfo: false
      };
    case types.SHOW_PAYINFO:
      return {
        ...state,
        isLoading: initState.isLoading,
        showPayInfo: true
      };
    case types.LIST_PAY_INFO:
      return {
        ...state,
        isLoading: initState.isLoading,
        listPayInfo: action.listPayInfo
      };
    case types.LISTING_PAY_INFO:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
