import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
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

    console.log("Filtered Film List.", displayedMovies);

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
