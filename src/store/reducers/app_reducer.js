import * as types from "../constants/action_types";
const initState = {
  isLoading: false,
  showPayInfo: false,
  listPayError: false,
  listResult: [],
  payInfo: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.LISTPAYINFO:
      return {
        ...state,
        listResult: action.data,
        isLoading: initState.isLoading,
        currentPage: initState.currentPage,
        searchErorr: initState.searchErorr,
        loadEnd: initState.loadEnd
      };
    case types.SEARCH_PAYINFO_LOAD_MORE:
      return {
        ...state,
        listResult: [...state.listResult, ...action.data],
        loadEnd:
          action.data && action.data.length == initState.pageSize
            ? initState.loadEnd
            : true,
        isLoading: initState.isLoading,
        searchErorr: initState.searchErorr,
        currentPage: state.currentPage + 1
      };
    case types.SEARCH_PAYINFO_ERROR:
      return {
        ...state,
        listPayError: true
      }
    case types.RESET_APPSTATE:

      return {
        ...initState
      }
    case types.CLOSE_PAYINFO:
      return {
        ...state,
        isLoading: initState.isLoading,
        showPayInfo: false,
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
        payInfo: action.payInfo,
        listPayError: initState.listPayError
      };
    case types.LISTING_PAY_INFO:
      return {
        ...state,
        //isLoading: true,
        listPayError: initState.listPayError
      };
    case types.LIST_PAY_ERROR:
      return {
        ...state,
        isLoading: initState.isLoading,
        listPayError: true
      }
    case types.LISTPAYINFO_CLEAR_ERROR:
      return {
        ...state,
        isLoading: initState.isLoading,
        listPayError: initState
      }
    default:
      return state;
  }
}
