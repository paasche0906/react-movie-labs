import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import SortMoviesCard from "../sortMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({ movies, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [userScore, setUserScore] = useState(0);
    const [minVotes, setMinVotes] = useState(0);
    const [releaseDateFrom, setReleaseDateFrom] = useState("");
    const [releaseDateTo, setReleaseDateTo] = useState("");
    const [language, setLanguage] = useState("");
    const [sortCriteria, setSortCriteria] = useState("popularityDesc");

    const genreId = Number(genreFilter);

    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().includes(nameFilter.toLowerCase());
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        })
        .filter((m) => {
            return userScore === 0 ? true : m.vote_average >= userScore;
        })
        .filter((m) => {
            return minVotes === 0 ? true : m.vote_count >= minVotes;
        })
        .filter((m) => {
            return releaseDateFrom === "" ? true : new Date(m.release_date) >= new Date(releaseDateFrom);
        })
        .filter((m) => {
            return releaseDateTo === "" ? true : new Date(m.release_date) <= new Date(releaseDateTo);
        })
        .filter((m) => {
            return language === "" ? true : m.original_language === language;
        });

    displayedMovies = displayedMovies.sort((a, b) => {
        switch (sortCriteria) {
            case "popularityAsc":
                return a.popularity - b.popularity;
            case "popularityDesc":
                return b.popularity - a.popularity;
            case "ratingAsc":
                return a.vote_average - b.vote_average;
            case "ratingDesc":
                return b.vote_average - a.vote_average;
            case "releaseDateAsc":
                return new Date(a.release_date) - new Date(b.release_date);
            case "releaseDateDesc":
                return new Date(b.release_date) - new Date(a.release_date);
            case "titleAsc":
                return a.title.localeCompare(b.title);
            case "titleDesc":
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    const handleChange = (type, value) => {
        switch (type) {
            case "name":
                setNameFilter(value);
                break;
            case "genre":
                setGenreFilter(value);
                break;
            case "userScore":
                setUserScore(value);
                break;
            case "minVotes":
                setMinVotes(value);
                break;
            case "releaseDateFrom":
                setReleaseDateFrom(value);
                break;
            case "releaseDateTo":
                setReleaseDateTo(value);
                break;
            case "language":
                setLanguage(value);
                break;
            default:
                break;
        }
    };

    const handleSortChange = (value) => {
        setSortCriteria(value);
    };

    return (
        <Grid container>
            <Grid size={12}>
                <Header title={title} />
            </Grid>
            <Grid container sx={{ flex: "1 1 500px" }}>
                <Grid
                    key="find"
                    size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                    sx={{ padding: "20px" }}
                >
                    <SortMoviesCard onSortChange={handleSortChange} />
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        userScore={userScore}
                        minVotes={minVotes}
                        releaseDateFrom={releaseDateFrom}
                        releaseDateTo={releaseDateTo}
                        language={language}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
        </Grid>
    );
}

export default MovieListPageTemplate;
