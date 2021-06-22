import React from 'react'
import { connect } from 'react-redux'
import { getPersonAC } from '../actions'
import { mapStateToProps } from '../reducers'
import './Card.scss'
import closeIcon from '../assets/close.png'

const Card = ({filters, people, pages, personInfo, dispatch}) => {
  const keys = ['I', 'II', 'III', 'IV', 'V', 'VI']

  const closePopup = () => {
    dispatch(getPersonAC(null))
  }
  const personMovies = (films) => {
    const movies = []
    for(let i = 0; i < films.length; i++) {
      const foundMovie = filters.movies.results.find(movie => movie.url === films[i])
      movies.push('Episode ' + keys[foundMovie.episode_id - 1])
    }
    return movies.join(', ')
  }

  return personInfo && filters ?
    <div className="character-popup">
      <div className="character-card">
        <button onClick={() => closePopup()} className="close-button">
          <img src={closeIcon} alt="close"/>
        </button>
        <ul>
          <li>Name: {personInfo.name}</li>
          <li>Species: {!personInfo.species.length
              ? 'Human'
              : filters.species.results.find(species => {
                  if(species.url === personInfo.species[0]) return species
              }).name}
          </li>
          <li>Movies: {personMovies(personInfo.films)}</li>
          <li>Spaceships: {!personInfo.starships.length
              ? '-'
              : personInfo.starships.map(
                starship => starship.name).join(', ')}
          </li>
        </ul>
      </div>
    </div>
    : null
}

export default connect(mapStateToProps)(Card)
