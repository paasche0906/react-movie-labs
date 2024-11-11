export const getMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovie = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getUpcomingMovies = async () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    ).then(res => res.json());
};

export const getTrendingMoviesToday = async () => {
    return fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`,
    ).then(res => res.json());
};

export const getPopularMovies = async () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`,
    ).then(res => res.json());
};

export const getTopRatedMovies = async () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`,
    ).then(res => res.json());
};

export const getCredits = (movieId) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieRecommendations = (movieId) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getSimilarMovies = (movieId) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getVideos = (movieId) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getPeopleDetails = (personId) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieCredits = (personId) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};


