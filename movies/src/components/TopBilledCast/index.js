import React from 'react';
import { useQuery } from 'react-query';
import { getCredits } from '../../api/tmdb-api';
import '../../css/TopBilledCast.css';
import { useParams } from 'react-router-dom';

const TopBilledCast = () => {
    const { id } = useParams();
    const { data, error, isLoading, isError } = useQuery(['credits', id], () => getCredits(id));

    if (isLoading) {
        return <p>Loading cast...</p>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const { cast } = data;

    const topBilledCast = cast.slice(0, 6);

    return (
        <div className="top-billed-cast-container">
            <h3>Top Billed Cast</h3>
            <div className="cast-grid">
                {topBilledCast.map(member => (
                    <div key={member.cast_id} className="cast-card">
                        <img
                            className="cast-image"
                            src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                            alt={member.name}
                        />
                        <div className="cast-info">
                            <h4>{member.name}</h4>
                            <p>{member.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopBilledCast;
