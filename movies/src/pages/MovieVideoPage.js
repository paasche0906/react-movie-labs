import React from "react";
import { useParams } from "react-router-dom";
import { getVideos } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

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
        <div>
            <h2>Movie Videos</h2>
            <div>
                {videos.length > 0 ? (
                    videos.map(video => (
                        <div key={video.id}>
                            <h3>{video.name}</h3>
                            <iframe
                                title={video.name}
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${video.key}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))
                ) : (
                    <p>There are no videos available for the current film.</p>
                )}
            </div>
        </div>
    );
};

export default MovieVideoPage;
