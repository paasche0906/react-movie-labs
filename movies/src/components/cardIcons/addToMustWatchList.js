import React, { useContext } from 'react';
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const MovieItem = ({ movie }) => {
    const { addToMustWatchList, mustWatchList } = useContext(MoviesContext);

    const handleAddToMustWatch = () => {
        addToMustWatchList(movie.id);
    };

    return (
        <div className="movie-item">
            <PlaylistAddIcon onClick={handleAddToMustWatch} style={{ cursor: 'pointer' }} />
        </div>
    );
};

export default MovieItem;