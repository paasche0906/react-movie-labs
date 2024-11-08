import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";  // Import the new API function
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import MovieItem from "../components/cardIcons/addToMustWatchList";

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
                return <MovieItem movie={movie} />
            }}
        />
    );
};

export default UpcomingMoviesPage;
