import { combineReducers } from "redux";
import { NavigationActions } from "react-navigation";
import * as action_types from "../../constants/action_types";
import { RootNavigationContainer } from "../../../routers/root_navigation_config";
const mainAction = RootNavigationContainer.router.getActionForPathAndParams(
  "UserInfo"
);
const initialNavState = RootNavigationContainer.router.getStateForAction(
  mainAction
);
// const initialNavState = RootNavigationContainer.router.getStateForAction(
//     mainAction,
//     0//index default 0
// );

function navigationReducer(state = initialNavState || {}, action = {}) {
  let nextState;
  switch (action.type) {
    case action_types.PUSH_ROUTE:
      switch (action.route.id) {
        case "UserInfo":
          nextState = RootNavigationContainer.router.getStateForAction(
            NavigationActions.navigate({
              routeName: action.route.id,
              // params: { oFilmServer: action.route.oFilmServer },
              action: NavigationActions.navigate({ routeName: action.route.id })
            }),
            state
          );
          break;
        case "Search":
          nextState = RootNavigationContainer.router.getStateForAction(
            NavigationActions.navigate({
              routeName: action.route.id,
              // params: { oFilmServer: action.route.oFilmServer },
              action: NavigationActions.navigate({ routeName: action.route.id })
            }),
            state
          );
          break;
        case "BillList":
          nextState = RootNavigationContainer.router.getStateForAction(
            NavigationActions.navigate({
              routeName: action.route.id,
              params: { apartment: action.route.apartment },
              action: NavigationActions.navigate({ routeName: action.route.id })
            }),
            state
          );
          break;
        case "BillDetail":
          nextState = RootNavigationContainer.router.getStateForAction(
            NavigationActions.navigate({
              routeName: action.route.id,
              // params: { userId: action.route.userId },
              action: NavigationActions.navigate({ routeName: action.route.id })
            }),
            state
          );
          break;
        case "History":
          nextState = RootNavigationContainer.router.getStateForAction(
            NavigationActions.navigate({
              routeName: action.route.id,
              // params: { userId: action.route.userId },
              action: NavigationActions.navigate({ routeName: action.route.id })
            }),
            state
          );
          break;
        default:
          nextState = RootNavigationContainer.router.getStateForAction(
            NavigationActions.navigate({ routeName: action.route.id }),
            state
          );
          break;
      }
      break;
    case action_types.POP_ROUTE:
      nextState = RootNavigationContainer.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    default:
      nextState = RootNavigationContainer.router.getStateForAction(
        action,
        state
      );
      break;
  }

  return nextState || state;
}
export default navigationReducer;
