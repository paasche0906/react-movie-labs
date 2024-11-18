import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import MovieItem from "../components/cardIcons/addToMustWatchList";
const TopRatedMovies = () => {

    const { data, error, isLoading, isError } = useQuery('topRatedMovies', getTopRatedMovies);

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
            title="Top Rated Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <AddToFavoritesIcon movie={movie} />
                        <MovieItem movie={movie} />
                    </div>
                );
            }}
        />
    );
};

export default TopRatedMovies;