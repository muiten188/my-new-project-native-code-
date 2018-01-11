import * as types from "../constants/action_types";
const initState = {
  isLoading: false,
  showPayInfo: false
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.CLOSE_PAYINFO:
      return {
        showPayInfo: false
      };
    case types.SHOW_PAYINFO:
      return {
        showPayInfo: true
      };
    default:
      return state;
  }
}
