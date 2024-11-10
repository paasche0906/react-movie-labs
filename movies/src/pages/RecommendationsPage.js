import React from "react";
import { useParams } from "react-router-dom";
import { getMovieRecommendations } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const RecommendationsPage = () => {
    const { id } = useParams(); // 获取电影 ID 参数
    const { data, error, isLoading, isError } = useQuery(['recommendations', id], () => getMovieRecommendations(id));

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    return (
        <PageTemplate
            title="Recommended Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />;
            }}
        />
    );
};

export default RecommendationsPage;