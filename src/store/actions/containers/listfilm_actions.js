import * as types from '../../constants/action_types';
import * as AppConfig from '../../config/app_config';

export function refreshListFilm() {
  return (dispatch) => {
    dispatch(getListFilm());
  }
}
export function getListFilm() {
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
export function listFilm(oListFilm) {
  return {
    type: types.LIST_FILM,
    oListFilm
  }
}
