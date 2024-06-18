import { NavLink, useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import '../styles/header.scss'
import { useEffect, useState } from "react"

const Header = ({ searchMovies }) => {

  const { starredMovies } = useSelector((state) => state.starred)
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const searchParam = searchParams.get('search');
  useEffect(() => {
    searchMovies(searchText, setSearchParams);

  }, [searchText]);

  useEffect(() => {
    if (!searchText && searchParam) {
      setSearchText(searchParam);
    }
  }, [])
  return (
    <header>
      <NavLink to="/" data-testid="home">
        <i className="bi bi-film" />
      </NavLink>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input type="search" data-testid="search-movies"
          onChange={(e) => setSearchText(e?.target?.value)}
          value={searchText}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  )
}

export default Header
