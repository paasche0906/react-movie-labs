import React from "react";
import { useParams } from "react-router-dom";
import { getCredits } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import '../css/MovieCreditsPage.css';

const MovieCreditsPage = () => {
    const { id } = useParams();
    const { data, error, isLoading, isError } = useQuery(['credits', id], () => getCredits(id));

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const { cast, crew } = data;

    return (
        <div className="credits-page-container">
            <h2 className="credits-page-title">Full cast & Crew</h2>

            <div className="credits-section">
                <h3>Cast List</h3>
                <div className="credits-grid">
                    {cast.map(member => (
                        <div key={member.cast_id} className="credits-card">
                            <img
                                className="credits-image"
                                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                alt={member.name}
                            />
                            <div className="credits-info">
                                <h4>{member.name}</h4>
                                <p> {member.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="credits-section">
                <h3>Production Team</h3>
                <div className="credits-grid">
                    {crew.map(member => (
                        <div key={member.credit_id} className="credits-card">
                            <img
                                className="credits-image"
                                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                alt={member.name}
                            />
                            <div className="credits-info">
                                <h4>{member.name}</h4>
                                <p>Position: {member.job}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieCreditsPage;
