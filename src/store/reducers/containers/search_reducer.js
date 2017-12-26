import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listResult:[]
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.LIST_RESULT:
      return {
        ...state,
        listResult:action.data,
        isLoading:false
      };
    case types.SEARCHING:
      return {
        ...state,
        isLoading:action.isLoading
      };
    default:
      return state;
  }
}
