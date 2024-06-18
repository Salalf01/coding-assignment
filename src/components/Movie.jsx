import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'
import { useState } from 'react'
import { API_KEY, ENDPOINT } from '../constants'
import Lightbox from './LightBox'
import { createPortal } from 'react-dom'

const Movie = ({ movie }) => {

    const state = useSelector((state) => state);
    const { starred, watchLater } = state
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions
    const [videoKey, setVideoKey] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [disableVideoButton, setDisableVideoButton] = useState(false);
    const dispatch = useDispatch();
    const onClose = () => {
        setVideoKey('');
        setOpen(false);

    }


    const viewTrailer = async (id) => {
        if (!videoKey) setOpen(true)
        const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

        const videoData = await (await fetch(URL)).json();



        if (videoData.videos && videoData.videos.results.length) {
            const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
            setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
        } else {
            setDisableVideoButton(true);
        }
    };


    const onStarMovie = () => {
        dispatch(starMovie({
            id: movie.id,
            overview: movie.overview,
            release_date: movie.release_date?.substring(0, 4),
            poster_path: movie.poster_path,
            title: movie.title
        }));
    }

    const onAddToWatchLater = () => {
        dispatch(addToWatchLater({
            id: movie.id,
            overview: movie.overview,
            release_date: movie.release_date?.substring(0, 4),
            poster_path: movie.poster_path,
            title: movie.title
        }));
    }

    const isMovieStarred = starred.starredMovies.some(item => item.id === movie.id);
    const isToWatchLater = watchLater.watchLaterMovies.some(item => item.id === movie.id);


    return (
        <div className="wrapper" data-testid="movie-card">
            <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')} >
                <div className="card-body text-center">
                    <div className="overlay" />
                    <div className="info_panel">
                        <div className="overview">{movie.overview}</div>
                        <div className="year">{movie.release_date?.substring(0, 4)}</div>
                        <div style={{ width: '100%' }}>
                            {!isMovieStarred ? (
                                <span className="btn-star"
                                    data-testid="starred-link"
                                    onClick={onStarMovie}>
                                    <i className="bi bi-star" />
                                </span>
                            ) : (
                                <span className="btn-star"
                                    data-testid="unstar-link"
                                    onClick={() => dispatch(unstarMovie(movie))}>
                                    <i className="bi bi-star-fill" data-testid="star-fill" />
                                </span>
                            )}

                            {!isToWatchLater ? (
                                <button type="button"
                                    data-testid="watch-later"
                                    className="btn btn-light btn-watch-later card-button"
                                    onClick={onAddToWatchLater}>Watch Later</button>
                            ) : (
                                <button type="button"
                                    data-testid="remove-watch-later"
                                    className="btn btn-light btn-watch-later blue card-button"
                                    onClick={() => dispatch(removeFromWatchLater(movie))}>
                                    <i className="bi bi-check"></i>
                                </button>
                            )}
                            <button type="button"
                                className="btn btn-dark card-button"
                                disabled={disableVideoButton}
                                onClick={() => viewTrailer(movie.id)}> {disableVideoButton ? "Video trailer not available" : "View Trailer"}</button>
                        </div>
                    </div>
                    <img className="center-block"
                        src={(movie.poster_path)
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` :
                            placeholder} alt="Movie poster" />
                </div>
                <h6 className="title">{movie.title}</h6>
            </div>
            {videoKey && createPortal(<Lightbox videoKey={videoKey} isOpen={isOpen} onClose={onClose} />, document.body)}
        </div>
    )
}

export default Movie