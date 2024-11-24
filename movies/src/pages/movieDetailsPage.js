import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { Link } from "react-router-dom";
import TopBilledCast from "../components/TopBilledCast";

const MoviePage = () => {
    const { id } = useParams();
    const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", { id: id }],
        getMovie
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie}>
                        <MovieDetails movie={movie} />
                        <TopBilledCast />

                        <Link to={`/movie/${id}/credits`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#a213v2' }}>
                            View Credits
                        </Link>
                        <Link to={`/movie/${id}/recommendations`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#3f51b5' }}>
                            View Recommendations
                        </Link>
                        <Link to={`/movie/${id}/similar`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#388e3c', textDecoration: 'underline' }}>
                            View Similar Movies
                        </Link>
                        <Link to={`/movie/${id}/videos`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#213552', textDecoration: 'underline' }}>
                            View Videos
                        </Link>
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MoviePage;
