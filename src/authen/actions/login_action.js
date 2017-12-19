import * as types from '../../store/constants/action_types';
import * as AppConfig from '../../config/app_config';

export function login(value) {
  return {
    type: types.LOGIN_SUCCESS,
    Logged:true
  }
}
