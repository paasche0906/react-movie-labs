import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPeopleDetails, getMovieCredits } from '../api/tmdb-api';
import Spinner from '../components/spinner';

const PersonDetailsPage = () => {
    const { personId } = useParams();
    const { data: personDetails, error: detailsError, isLoading: detailsLoading } = useQuery(
        ['personDetails', personId],
        () => getPeopleDetails(personId)
    );

    const { data: movieCredits, error: movieError, isLoading: movieLoading } = useQuery(
        ['movieCredits', personId],
        () => getMovieCredits(personId)
    );

    if (detailsLoading || movieLoading) {
        return <Spinner />;
    }

    if (detailsError || movieError) {
        return <h1>Error: {detailsError?.message || movieError?.message}</h1>;
    }

    return (
        <div className="person-details-container">
            <h1>{personDetails.name}</h1>
            <img src={`https://image.tmdb.org/t/p/w300${personDetails.profile_path}`} alt={personDetails.name} />
            <p>{personDetails.biography || "暂无简介"}</p>

            <h2>代表作品</h2>
            <div>
                {movieCredits.cast.slice(0, 5).map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>角色: {movie.character}</p>
                    </div>
                ))}
            </div>

            <h2>电影作品</h2>
            <ul>
                {movieCredits.cast.map((movie) => (
                    <li key={movie.id}>
                        {movie.release_date?.split('-')[0]} - {movie.title} as {movie.character}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonDetailsPage;