import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist.js";
import WriteReview from "../components/cardIcons/writeReview";

const WatchlistMoviesPage = () => {
    const { mustWatchList: movieIds } = useContext(MoviesContext);

    const watchlistMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );

    const isLoading = watchlistMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const movies = watchlistMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id);
        return q.data;
    });

    return (
        <PageTemplate
            title="Watchlist"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromWatchlist movie={movie} />
                        <WriteReview movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default WatchlistMoviesPage;
