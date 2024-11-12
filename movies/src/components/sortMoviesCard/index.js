import React, { useState } from "react";

function SortMoviesCard({ onSortChange }) {
    const [selectedSort, setSelectedSort] = useState("popularityDesc");

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const handleApplySort = () => {
        onSortChange(selectedSort);
    };

    return (
        <div>
            <label htmlFor="sortCriteria">Sort Results By</label>
            <select id="sortCriteria" onChange={handleSortChange} value={selectedSort}>
                <option value="popularityAsc">Popularity Ascending</option>
                <option value="popularityDesc">Popularity Descending</option>
                <option value="ratingAsc">Rating Ascending</option>
                <option value="ratingDesc">Rating Descending</option>
                <option value="releaseDateAsc">Release Date Ascending</option>
                <option value="releaseDateDesc">Release Date Descending</option>
                <option value="titleAsc">Title (A-Z)</option>
                <option value="titleDesc">Title (Z-A)</option>
            </select>
            <button onClick={handleApplySort}>Apply Sort</button>
        </div>
    );
}

export default SortMoviesCard;