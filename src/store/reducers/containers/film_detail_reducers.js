import * as types from '../../constants/action_types';
const initState = {
  isLoading: true
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.WATCH:
      return {
        ...state,
        action
      };
    case types.FETCHFILMDETAIL:
      let loading = true;
      if (action.filmDetail) {
        loading = false;
      }
      return {
        ...state,
        filmDetail: action.filmDetail,
        isLoading: loading
      };
    case types.RESETSTATE:
      return {
        ...state,
        isLoading: initState.isLoading
      };
    default:
      return state;
  }
}
