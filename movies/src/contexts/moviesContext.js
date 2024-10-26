import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [mustWatchList, setMustWatchList] = useState([]);

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        }
        else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };
    console.log(myReviews);

    const addToMustWatchList = (movieId) => {
        setMustWatchList((prevList) => [...prevList, movieId]);
        console.log([...mustWatchList, movieId]);
    };

    const removeFromMustWatchList = (movieId) => {
        setMustWatchList((prevList) => prevList.filter(id => id !== movieId));
        console.log(mustWatchList.filter(id => id !== movieId)); 
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