import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import Pagination from '../components/pagination';

const HomePage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isLoading, isError } = useQuery(['discover', page], () => getMovies(page), {
        keepPreviousData: true,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    return (
        <div>
            <PageTemplate
                title="Discover Movies"
                movies={movies}
                action={(movie) => {
                    return (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <AddToFavoritesIcon movie={movie} />
                            <AddToWatchlistIcon movie={movie} />
                        </div>
                    );
                }}
            />
            <Pagination
                currentPage={page}
                totalPages={data.total_pages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default HomePage;
