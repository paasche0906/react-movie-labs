import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import MovieItem from "../components/cardIcons/addToWatchlist";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const UpcomingMoviesPage = () => {

    const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const upcomingMovies = data.results;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={upcomingMovies}
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

export default UpcomingMoviesPage;
