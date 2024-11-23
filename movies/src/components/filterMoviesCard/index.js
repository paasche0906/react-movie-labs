import React from 'react';
import { useQuery } from 'react-query';
import { getGenres } from '../../api/tmdb-api';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Spinner from '../spinner';

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
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="filter-content"
                id="filter-header"
            >
                <Typography variant="h6">Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {/* Filter by Keywords */}
                    <FormControl fullWidth variant="filled" size="small">
                        <TextField
                            id="filled-search"
                            label="Filter by keywords"
                            type="search"
                            variant="filled"
                            value={props.titleFilter}
                            onChange={handleTextChange}
                        />
                    </FormControl>

                    {/* Filter by Genre */}
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="genre-label">Genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre-select"
                            value={props.genreFilter}
                            onChange={handleGenreChange}
                            label="Genre"
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* User Score Slider */}
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
                    />

                    {/* Minimum User Votes Slider */}
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
                    />

                    {/* Release Date From */}
                    <FormControl fullWidth variant="outlined" size="small">
                        <TextField
                            id="release-date-from"
                            label="Release Date From"
                            type="date"
                            defaultValue=""
                            onChange={(e) => handleChange(e, 'releaseDateFrom', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                    {/* Release Date To */}
                    <FormControl fullWidth variant="outlined" size="small">
                        <TextField
                            id="release-date-to"
                            label="Release Date To"
                            type="date"
                            defaultValue=""
                            onChange={(e) => handleChange(e, 'releaseDateTo', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                    {/* Language Filter */}
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="language-label">Language</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language-select"
                            value={props.language}
                            onChange={(e) => handleChange(e, 'language', e.target.value)}
                            label="Language"
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
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}
