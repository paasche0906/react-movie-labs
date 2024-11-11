// MovieCreditsPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCredits } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import '../css/MovieCreditsPage.css';

const MovieCreditsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // 使用 useNavigate 来实现跳转
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
            <div className="navigation-arrows">
                <button onClick={() => navigate(-1)} className="arrow-button">
                    &#8592;
                </button>
                <h2 className="credits-page-title">全体演员与剧组</h2>
                <button onClick={() => navigate(1)} className="arrow-button">
                    &#8594;
                </button>
            </div>

            <div className="credits-section">
                <h3>演员列表</h3>
                <div className="credits-grid">
                    {cast.map(member => (
                        <div
                            key={member.cast_id}
                            className="credits-card"
                            onClick={() => navigate(`/person/${member.id}`)} // 点击跳转
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                className="credits-image"
                                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                alt={member.name}
                            />
                            <div className="credits-info">
                                <h4>{member.name}</h4>
                                <p>{member.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="credits-section">
                <h3>制作团队</h3>
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
                                <p>职位: {member.job}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieCreditsPage;
