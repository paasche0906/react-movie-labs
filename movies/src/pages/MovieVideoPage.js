import React from "react";
import { useParams } from "react-router-dom";
import { getVideos } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import '../css/MovieVideoPage.css'; 

const MovieVideoPage = () => {
    const { id } = useParams();
    const { data, error, isLoading, isError } = useQuery(['movieVideos', id], () => getVideos(id));

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const videos = data.results;

    return (
        <div className="video-page-container">
            <h2 className="video-page-title">Movie Videos</h2>
            <div className="video-grid">
                {videos.length > 0 ? (
                    videos.map(video => (
                        <div key={video.id} className="video-card">
                            <h3 className="video-title">{video.name}</h3>
                            <iframe
                                className="video-iframe"
                                title={video.name}
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${video.key}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))
                ) : (
                    <p className="no-videos-message">There are no videos available for the current film.</p>
                )}
            </div>
        </div>
    );
};

export default MovieVideoPage;
