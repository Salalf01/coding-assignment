import Movie from './Movie'
import '../styles/movies.scss'
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getMovies } from '../data/utils';

const Movies = ({ viewTrailer, closeCard }) => {
    const state = useSelector((state) => state)
    const { movies } = state;
    const loaderRef = useRef();
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentParam, setCurrentParam] = useState('');
    const searchParam = searchParams.get('search');
    const moviesResults = movies?.movies?.results;
    const totalResults = movies?.movies?.total_results;

    const showClipLoader = moviesResults?.length > 0 && totalResults > items.length;

    useEffect(() => {
        getMovies();
        setCurrentParam(searchParam);

    }, []);

    useEffect(() => {
        if (moviesResults?.length > 0) {
            setLoading(false);
            if (currentParam === searchParam) {
                setItems((prev) => {
                    const mergedUniqueById = [
                        ...new Map([...prev, ...moviesResults].map((item) => [item["id"], item])).values(),
                    ];
                    return mergedUniqueById;
                });
            }
            else {
                setItems(() => [...moviesResults]);
            }
            setCurrentParam(searchParam);
        }
    }, [movies, currentParam, searchParam]);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && moviesResults?.length > 0 && !isLoading) {
                setLoading(true);
                setTimeout(() => {
                    if (totalResults > items.length) {
                        getMovies(searchParam, movies?.movies?.page + 1);
                    }
                }, 1000);
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [getMovies, movies, isLoading, totalResults, items]);




    return (
        <div data-testid="movies">
            <div className="cards-list">
                {items.map((movie) => {
                    return (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={viewTrailer}
                            closeCard={closeCard}
                        />
                    )
                })}
            </div>
            <div ref={loaderRef} className="loader">
                {showClipLoader && (
                    <ClipLoader />
                )}
            </div>
        </div>
    )
}

export default Movies
