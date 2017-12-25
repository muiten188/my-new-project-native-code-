import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function search(values) {
  let data = [];
  let dataPost = values || {};
  // dispatch(_search());
  return dispatch => {
    fetch(`${AppConfig.API_HOST}tablet/apartment`, {
      method: "GET"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        debugger;
        if (responseJson.data) {
          data = responseJson.data;
          dispatch(_search(data));
        } else {
          dispatch(_search(data));
        }
      });
  };
}

function _search(data) {
  return {
    type: types.LIST_RESULT,
    data: data
  };
}

export function getListFilm() {
  return dispatch => {
    let oListFilm;
    fetch(
      `http://${
        AppConfig.CRAWLER_HOST
      }/oFilmSite/getListFilm?url=https://phim14.net&name=phim14`,
      {
        method: "GET"
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        if (responseJson.IsSuccess) {
          oListFilm = JSON.parse(responseJson.Data);
          dispatch(listFilm(oListFilm));
        } else {
          //fail
        }
      });
  };
}
export function listFilm(oListFilm) {
  return {
    type: types.LIST_FILM,
    oListFilm
  };
}
