import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SortMoviesCard({ onSortChange }) {
    const [selectedSort, setSelectedSort] = useState("popularityDesc");

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const handleApplySort = () => {
        onSortChange(selectedSort);
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">Sort</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="sort-label">Sort Results By</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sortCriteria"
                            value={selectedSort}
                            onChange={handleSortChange}
                            label="Sort Results By"
                        >
                            <MenuItem value="popularityAsc">Popularity Ascending</MenuItem>
                            <MenuItem value="popularityDesc">Popularity Descending</MenuItem>
                            <MenuItem value="ratingAsc">Rating Ascending</MenuItem>
                            <MenuItem value="ratingDesc">Rating Descending</MenuItem>
                            <MenuItem value="releaseDateAsc">Release Date Ascending</MenuItem>
                            <MenuItem value="releaseDateDesc">Release Date Descending</MenuItem>
                            <MenuItem value="titleAsc">Title (A-Z)</MenuItem>
                            <MenuItem value="titleDesc">Title (Z-A)</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleApplySort}>
                        Apply Sort
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default SortMoviesCard;
