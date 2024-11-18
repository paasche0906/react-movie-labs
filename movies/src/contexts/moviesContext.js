import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([]);
    const [myReviews, setMyReviews] = useState({});
    const [mustWatchList, setMustWatchList] = useState([]);

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        } else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites);
    };

    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter((mId) => mId !== movie.id));
    };

    const addToMustWatchList = (movieId) => {
        if (!mustWatchList.includes(movieId)) {
            setMustWatchList((prevList) => [...prevList, movieId]);
        }
    };

    const removeFromMustWatchList = (movieId) => {
        setMustWatchList((prevList) => prevList.filter((id) => id !== movieId));
    };

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review });
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                mustWatchList,
                addToMustWatchList,
                removeFromMustWatchList,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
