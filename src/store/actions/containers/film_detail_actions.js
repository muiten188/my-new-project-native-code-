import * as types from '../../constants/action_types';
import * as AppConfig from '../../config/app_config';
export function getFilmDetail(film) {
  return dispatch => {
    let oFilmDetail;
    fetch(`http://${AppConfig.CRAWLER_HOST}/oFilmSite/getFilmDetail?url=${film.Url}&name=phim14`, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (responseJson) {
      if (responseJson.IsSuccess) {
        oFilmDetail = JSON.parse(responseJson.Data);
        dispatch(filmDetail(oFilmDetail));
      }
      else {
        //fail
      }
    });
  }
}

export function filmDetail(oFilmDetail) {
  return {
    type: types.FETCHFILMDETAIL,
    filmDetail: oFilmDetail
  };
}

export function watch() {
  return {
    type: types.WATCH
  };
}
export function resetState() {
  return {
    type: types.RESETSTATE
  };
}