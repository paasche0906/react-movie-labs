import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { Link } from "react-router-dom";
import TopBilledCast from "../components/TopBilledCast";
import MovieVideos from "../components/MovieVideos";

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
                        <Link
                            to={`/movie/${id}/credits`}
                            className="view-full-cast-button"
                        >
                            View Full Cast & Crew →
                        </Link>
                        <MovieVideos />
                        <Link
                            to={`/movie/${id}/recommendations`}
                            className="view-full-cast-button" 
                        >
                            View Recommendations →
                        </Link>

                        <Link
                            to={`/movie/${id}/similar`}
                            className="view-full-cast-button" 
                        >
                            View Similar Movies →
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
