import { createSearchParams } from "react-router-dom"
import { fetchMovies } from "./moviesSlice"
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants"
import store from './store';
const dispatch = store.dispatch;


export const searchMovies = (query, setSearchParams) => {
    if (query !== '') {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`))
        setSearchParams(createSearchParams({ search: query }))
    } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER))
        setSearchParams()
    }
}

export const getMovies = (searchQuery, page = 1) => {
    if (searchQuery) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`))
    } else {
        dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`))
    }
}