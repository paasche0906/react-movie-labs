import React from 'react';
import { useQuery } from 'react-query';
import { getGenres } from '../../api/tmdb-api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Spinner from '../spinner';

const formControl = {
    margin: 1,
    minWidth: '90%',
    backgroundColor: 'rgb(255, 255, 255)',
};

export default function FilterMoviesCard(props) {
    const { data, error, isLoading, isError } = useQuery('genres', getGenres);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const genres = data.genres;
    if (genres[0].name !== 'All') {
        genres.unshift({ id: '0', name: 'All' });
    }

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value);
    };

    const handleTextChange = (e) => {
        handleChange(e, 'name', e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, 'genre', e.target.value);
    };

    const handleSliderChange = (e, newValue, type) => {
        handleChange(e, type, newValue);
    };

    return (
        <Card
            sx={{
                backgroundColor: 'rgb(204, 204, 0)',
            }}
            variant="outlined"
        >
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                </Typography>

                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Filter by keywords:"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />

                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        defaultValue=""
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography variant="body1" gutterBottom>
                    User Score
                </Typography>
                <Slider
                    value={props.userScore}
                    onChange={(e, newValue) => handleSliderChange(e, newValue, 'userScore')}
                    min={0}
                    max={10}
                    step={0.5}
                    valueLabelDisplay="auto"
                    sx={{ ...formControl }}
                />

                <Typography variant="body1" gutterBottom>
                    Minimum User Votes
                </Typography>
                <Slider
                    value={props.minVotes}
                    onChange={(e, newValue) => handleSliderChange(e, newValue, 'minVotes')}
                    min={0}
                    max={500}
                    step={10}
                    valueLabelDisplay="auto"
                    sx={{ ...formControl }}
                />

                <TextField
                    id="release-date-from"
                    label="From"
                    type="date"
                    defaultValue=""
                    onChange={(e) => handleChange(e, 'releaseDateFrom', e.target.value)}
                    sx={{ ...formControl }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="release-date-to"
                    label="To"
                    type="date"
                    defaultValue=""
                    onChange={(e) => handleChange(e, 'releaseDateTo', e.target.value)}
                    sx={{ ...formControl }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                        labelId="language-label"
                        id="language-select"
                        defaultValue=""
                        value={props.language}
                        onChange={(e) => handleChange(e, 'language', e.target.value)}
                    >
                        <MenuItem value={''}>None Selected</MenuItem>
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'es'}>Spanish</MenuItem>
                        <MenuItem value={'fr'}>French</MenuItem>
                        <MenuItem value={'de'}>German</MenuItem>
                        <MenuItem value={'zh'}>Chinese</MenuItem>
                        <MenuItem value={'hi'}>Hindi</MenuItem>
                        <MenuItem value={'ja'}>Japanese</MenuItem>
                        <MenuItem value={'ru'}>Russian</MenuItem>
                        <MenuItem value={'ar'}>Arabic</MenuItem>
                        <MenuItem value={'pt'}>Portuguese</MenuItem>
                        <MenuItem value={'it'}>Italian</MenuItem>
                    </Select>
                </FormControl>

            </CardContent>
        </Card>
    );
}
