import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PageTemplate from '../components/templateMovieListPage';
import { getSimilarMovies } from '../api/tmdb-api';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const SimilarMoviesPage = () => {
    const { id } = useParams();
    const { data, error, isLoading, isError } = useQuery(['similarMovies', id], () => getSimilarMovies(id));

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    return (
        <PageTemplate
            title="Similar Movies"
            movies={movies}
            action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
    );
};

export default SimilarMoviesPage;
