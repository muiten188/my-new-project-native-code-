import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listResult:[]
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.HISTORYING:
      return {
        ...state,
        isLoading: false
      };
    case types.HISTORY:
      return {
        ...state,
        listResult: action.listResult,
        isLoading: false
      };
    default:
      return state;
  }
}
