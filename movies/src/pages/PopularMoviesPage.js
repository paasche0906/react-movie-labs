import React from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const PopularMoviesPage = () => {

    const { data, error, isLoading, isError } = useQuery('popularMovies', getPopularMovies);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    const favorites = movies.filter(m => m.favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    return (
        <PageTemplate
            title="Popular Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};

export default PopularMoviesPage;
