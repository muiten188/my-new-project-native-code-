import * as types from '../../store/constants/action_types';
import { debug } from 'util';
const initState = {
    Logged: false
};

export default function (state = initState, action = {}) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                Logged:action.Logged,
                action
            };
        default:
            return state;
    }
}
