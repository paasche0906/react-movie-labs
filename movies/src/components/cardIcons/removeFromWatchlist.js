import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

const RemoveFromWatchlist = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromWatchlist = (e) => {
        e.preventDefault();
        context.removeFromMustWatchList(movie.id);
    };

    return (
        <IconButton aria-label="remove from watchlist" onClick={handleRemoveFromWatchlist}>
            <PlaylistRemoveIcon color="secondary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromWatchlist;
