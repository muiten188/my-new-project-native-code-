import * as types from "../../constants/action_types";
const initState = {
  isLoading: true
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.LIST_RESULT:
      return {
        ...state,
        listResult:action.data
      };
    default:
      return state;
  }
}
