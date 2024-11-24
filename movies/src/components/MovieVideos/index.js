import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getVideos } from '../../api/tmdb-api';
import '../../css/MovieVideos.css';

const MovieVideos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading, isError } = useQuery(['videos', id], () => getVideos(id));

    if (isLoading) {
        return <p>Loading videos...</p>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const { results: videos } = data;

    // Limit to the top 4 videos for display
    const displayedVideos = videos.slice(0, 4);

    return (
        <div className="movie-videos-container">
            <div className="media-header">
                <h3>Media</h3>
                <button
                    className="view-full-cast-button" 
                    onClick={() => navigate(`/movie/${id}/videos`)}
                >
                    View Videos →
                </button>
            </div>
            <div className="tabs">
                <span className="tab active">Videos {videos.length}</span>
            </div>
            <div className="videos-section">
                {displayedVideos.map(video => (
                    <div key={video.id} className="video-card">
                        <img
                            className="video-thumbnail"
                            src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                            alt={video.name}
                            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank')}
                        />
                        <div className="video-info">
                            <p>{video.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieVideos;
