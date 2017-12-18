import * as types from '../../store/constants/action_types';
import * as AppConfig from '../../config/app_config';

export function Login() {
  return (dispatch) => {
    let oListFilm;
    fetch(`http://${AppConfig.CRAWLER_HOST}/oFilmSite/getListFilm?url=https://phim14.net&name=phim14`, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      }).then(function (responseJson) {

        if (responseJson.IsSuccess) {
          oListFilm = JSON.parse(responseJson.Data);
          dispatch(listFilm(oListFilm));
        }
        else {
          //fail
        }
      });
  }
}
export function login(oListFilm) {
  return {
    type: types.LOGIN_SUCCESS,
    Logged:true
  }
}
