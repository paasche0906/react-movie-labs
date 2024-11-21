import React, { useState } from 'react';
import { Stack, Button, TextField } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [inputPage, setInputPage] = useState(currentPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            setInputPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            setInputPage(currentPage + 1);
        }
    };

    const handleInputChange = (event) => {
        setInputPage(event.target.value);
    };

    const handleInputSubmit = () => {
        let page = parseInt(inputPage, 10);
        if (page > totalPages) {
            page = totalPages;
        } else if (page < 1 || isNaN(page)) {
            page = 1;
        }
        onPageChange(page);
        setInputPage(page);
    };

    return (
        <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: '20px' }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <TextField
                    label="Page"
                    type="number"
                    value={inputPage}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleInputSubmit();
                        }
                    }}
                    size="small"
                    sx={{ width: '80px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInputSubmit}
                    sx={{
                        height: '40px',
                        padding: '5px 15px',
                        minWidth: '60px',
                        fontSize: '0.875rem',
                    }}
                >
                    Go
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Stack>
        </Stack>
    );
};

export default Pagination;
