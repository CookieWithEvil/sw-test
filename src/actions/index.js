export const setDraggableAC = (node) => {
  return {
    type: 'SET_DRAGGABLE',
    node: node
  }
}

export const getPeopleAC = (pageUrl) => {
  pageUrl = pageUrl || 'https://swapi.dev/api/people'
  return function(dispatch) {
    dispatch({
      type: 'PEOPLE_REQUESTED',
    });

  fetch(pageUrl)
    .then(response => response.json())
    .then(data => {
      return dispatch({
        type: 'PEOPLE_RECEIVED',
        people: data
      })})
    .catch(error => dispatch({
        type: 'PEOPLE_FAILED',
        people: []
      })
    );
  }
}

export const getStarshipsAC = (starships) => {
  return function(dispatch) {
    dispatch({
      type: 'STARSHIPS_REQUESTED',
    });

    Promise.all(starships.map(url =>
      fetch(url).then(resp => resp.json())
    )).then(res => {
      return dispatch({
        type: 'STARSHIPS_RECEIVED',
        personStarships: res
      })
    })
  }
}

export const getPersonAC = (personUrl) => {
  if(!personUrl) {
    return {
      type: 'PERSON_INFO_RECEIVED',
      info: null
    }
  }

  return function(dispatch) {
    dispatch({
      type: 'PERSON_INFO_REQUESTED',
    });

  fetch(personUrl)
    .then(response => response.json())
    .then(data => {
      if(data.starships.length) {
        dispatch(getStarshipsAC(data.starships))
      }

      return dispatch({
        type: 'PERSON_INFO_RECEIVED',
        info: data
      })})
    .catch(error => dispatch({
        type: 'PERSON_INFO_FAILED',
        info: null
      })
    );
  }
}

export const getFiltersAC = () => {
  const urls = ['https://swapi.dev/api/films', 'https://swapi.dev/api/species']

  return function(dispatch) {
    dispatch({
      type: 'PERSON_INFO_REQUESTED',
    });

    Promise.all(urls.map(url =>
      fetch(url).then(resp => resp.json())
    )).then(res => {
      return dispatch({
        type: 'FILTERS_INFO_RECEIVED',
        filters: {
          movies: res[0],
          species: res[1]
        }
      })
    })
  }
}
