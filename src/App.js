import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { getFiltersAC } from './actions'
import { mapStateToProps } from './reducers'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.scss'

import List from './components/List'
import Card from './components/Card'

function App({filters, people, pages, personInfo, dispatch}) {
  const [filteredPeople, setFilteredPeople] = useState(null)
  const [episodeUrl, setEpisodeUrl] = useState('')
  const [speciesUrl, setSpeciesUrl] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')

  const [favorites, setFavorites] = useState([])

  const filterPeople = () => {
    if(episodeUrl || speciesUrl || minYear || maxYear) {
      const filtered = people.results.filter(person => {
        const isEpisode = person.films.includes(episodeUrl)
        const isSpicies = (person.species.includes(speciesUrl)
        || (!person.species.length && speciesUrl === filters.species.results[0].url))
        const lessThanYear = maxYear ? parseInt(person.birth_year) <= parseInt(maxYear) : true
        const moreThanYear = minYear ? parseInt(person.birth_year) >= parseInt(minYear) : true

        if(!episodeUrl && !speciesUrl) return lessThanYear && moreThanYear
        if(episodeUrl && speciesUrl) return isEpisode && isSpicies && lessThanYear && moreThanYear
        else if(episodeUrl) return isEpisode && lessThanYear && moreThanYear
        else if(speciesUrl) return lessThanYear && moreThanYear && (isSpicies
          || (!person.species.length && speciesUrl === filters.species.results[0].url))
        })
        setFilteredPeople(filtered)
    }
  }

  useEffect(() => {
    dispatch(getFiltersAC())
  }, [])

  return (
    <div className="App">
      {/*FILTER*/}
      {filters && <div className="filters">
        <select onChange={(e) => setEpisodeUrl(e.target.value)}>
          <option key="no-movie" value={''}>Choose Episode</option>
          {filters.movies.results.map(movie => {
            return <option key={movie.title} value={movie.url}>{movie.title}</option>
          })}
        </select>

        <select onChange={(e) => setSpeciesUrl(e.target.value)}>
          <option key="no-species" value={''}>Choose Species</option>
          {filters.species.results.map(name => {
            return <option key={name.url} value={name.url}>{name.name}</option>
          })}
        </select>

        <div>
          <input placeholder="Type min year" type="text" value={minYear} onChange={(e) => setMinYear(e.target.value)} />
          <input placeholder="Type max year" type="text" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} />
        </div>

        <button onClick={() => filterPeople()}>Filter</button>
      </div>}

      <div className="lists-wrapper">
        <List filteredPeople={filteredPeople}/>
        <List filteredPeople={favorites} isFavorites={true}/>
      </div>

      <Card />
    </div>
  );
}

export default connect(mapStateToProps)(App);
