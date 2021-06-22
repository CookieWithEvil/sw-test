import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPeopleAC, getPersonAC, setDraggableAC } from '../actions'
import { mapStateToProps } from '../reducers'

import './List.scss'

const List = ({filteredPeople, currDraggable, isFavorites, filters, people, pages, personInfo, dispatch}, ) => {
  const favoritesInitialState = isFavorites ? filteredPeople : []
  const [favorites, setFavorites] = useState(favoritesInitialState)
  useEffect(() => {
    if(!people) dispatch(getPeopleAC())
  }, [filteredPeople, people, favorites])

  const moveToPage = (page) => {
    dispatch(getPeopleAC(page))
  }

  const getPersonInfo = (url) => {
    dispatch(getPersonAC(url))
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    let newFavorites = [...favorites, currDraggable]
    setFavorites(newFavorites)
  }

  const handleDragStart = (person) => {
    dispatch(setDraggableAC(person))
  }

  const peopleList = isFavorites ? favorites :
                      filteredPeople
                    ? filteredPeople
                    : (people && people.results)
                    ? people.results
                    : null

  return peopleList ?
  <div className={`list-wrapper ${isFavorites ? 'favorites' : ''}`}
        onDragOver={(event)=> handleDragOver(event)}
        onDrop={(event) => handleDrop(event)} >
      <ul className="list">
        {peopleList.map(person => (
              <li
                key={person.name}
                draggable
                onClick={() => getPersonInfo(person.url)}
                onDragStart={() => handleDragStart(person)}>
                  {person.name}
              </li>
        ))}
      </ul>

      {!isFavorites && <>
        <button
          onClick={() => moveToPage(people.previous)}
          disabled={!people.previous}>
          PREVIOUS
        </button>
        <button
          onClick={() => moveToPage(people.next)}
          disabled={!people.next}>
          NEXT
        </button>
      </>}
  </div>
  : null
}

export default connect(mapStateToProps)(List)
