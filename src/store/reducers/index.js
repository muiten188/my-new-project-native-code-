//authen
import authenNavigationReducer from '../../authen/reducers/authen_navigation_reducer';
import loginReducer from '../../authen/reducers/login_reducer';
//app
import navigationReducer from './root_navigation/root_navigation_reducer';
import searchReducer from '../../store/reducers/containers/search_reducer'
import userInfoReducer from '../../store/reducers/containers/userInfo_reducer';
import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
export default combineReducers({
    navigationReducer,
    authenNavigationReducer,
    loginReducer,
    searchReducer,
    userInfoReducer,
    form: formReducer
});
