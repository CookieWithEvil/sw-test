const initialState = {
  people: null,
  pages: {},
  personInfo: null,
  filters: null,
  currDraggable: null
}

export const mapStateToProps = (state) => {
  return state;
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PEOPLE_RECEIVED': {
      const currPage = +(action.people.next.slice(-1)) - 1
      const pageData = {}
      pageData[currPage] = action.people
      return {people: action.people, pages: {...state.pages, ...pageData}}
    }
    case 'PERSON_INFO_RECEIVED': {
      return {...state, personInfo: action.info}
    }
    case 'STARSHIPS_RECEIVED': {
      return {...state, personInfo: {...state.personInfo, starships: action.personStarships}}
    }
    case 'FILTERS_INFO_RECEIVED': {
      return {...state, filters: action.filters}
    }
    case 'SET_DRAGGABLE': {
      return {...state, currDraggable: action.node}
    }
    default:
      return state
  }
}
