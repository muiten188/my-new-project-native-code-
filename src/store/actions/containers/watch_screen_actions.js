import * as types from '../../constants/action_types';
import * as AppConfig from '../../config/app_config';
export function getLinkFilm(episode) {
  return (dispatch) => {
    fetch(`http://${AppConfig.CRAWLER_HOST}/oFilmSite/getWatchFilmUrl?url=${episode.EpisodeUrl}&name=phim14`, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      }).then(function (responseJson) {

        if (responseJson.IsSuccess) {
          oLinkFilm = JSON.parse(responseJson.Data);
          dispatch(linkFilm(oLinkFilm));
        }
        else {
          //fail
        }
      });
    
  }
}

export function linkFilm(oLinkFilm){
    return {
        type: types.GETDIRECTLINKFILM,
        oLinkFilm
    }
}

export function resetState(){
  return {
        type: types.RESETWATCHSCEENSTATE
    }
}