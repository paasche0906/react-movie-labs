import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPeopleDetails, getMovieCredits, getExternalId } from '../api/tmdb-api';
import Spinner from '../components/spinner';
import InstagramIcon from '../images/ins icon.png';
import TikTokIcon from '../images/tiktok icon.png';
import '../css/PersonDetailsPage.css';

const PersonDetailsPage = () => {
    const { personId } = useParams();
    const { data: personDetails, error: detailsError, isLoading: detailsLoading } = useQuery(
        ['personDetails', personId],
        () => getPeopleDetails(personId)
    );

    const { data: movieCredits, error: movieError, isLoading: movieLoading } = useQuery(
        ['movieCredits', personId],
        () => getMovieCredits(personId)
    );

    const { data: externalIds } = useQuery(
        ['externalIds', personId],
        () => getExternalId(personId)
    );

    if (detailsLoading || movieLoading) {
        return <Spinner />;
    }

    if (detailsError || movieError) {
        return <h1>Error: {detailsError?.message || movieError?.message}</h1>;
    }

    return (
        <div className="person-details-container">
            <div className="person-header">
                <img className="profile-img" src={`https://image.tmdb.org/t/p/w300${personDetails.profile_path}`} alt={personDetails.name} />
                <div className="header-info">
                    <h1 className="person-name">{personDetails.name}</h1>
                    <div className="social-media-links">
                        {externalIds?.instagram_id && (
                            <a href={`https://www.instagram.com/${externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer">
                                <img src={InstagramIcon} alt="Instagram" className="social-icon" />
                            </a>
                        )}
                        {externalIds?.tiktok_id && (
                            <a href={`https://www.tiktok.com/@${externalIds.tiktok_id}`} target="_blank" rel="noopener noreferrer">
                                <img src={TikTokIcon} alt="TikTok" className="social-icon" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <h2 className="section-title">Biography</h2>
            <p className="biography-text">{personDetails.biography || "No biography available."}</p>

            <div className="personal-info">
                <h2 className="section-title">Personal Info</h2>
                <p><strong>Known For: </strong>{personDetails.known_for_department}</p>
                <p><strong>Gender: </strong>{personDetails.gender === 1 ? "Female" : "Male"}</p>
                <p><strong>Birthday: </strong>{personDetails.birthday} ({getAge(personDetails.birthday)} years old)</p>
                <p><strong>Place of Birth: </strong>{personDetails.place_of_birth || "N/A"}</p>
                <p><strong>Also Known As: </strong></p>
                <ul>
                    {personDetails.also_known_as.map((alias, index) => (
                        <li key={index}>{alias}</li>
                    ))}
                </ul>
            </div>

            <h2 className="section-title">Known For</h2>
            <div className="known-for">
                {movieCredits.cast.slice(0, 5).map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <h3>
                            <Link to={`/movies/${movie.id}`} className="movie-title-link">{movie.title}</Link>
                        </h3>
                        <p>Role: {movie.character}</p>
                    </div>
                ))}
            </div>

            <h2 className="section-title">Acting</h2>
            <ul className="acting-list">
                {movieCredits.cast.map((movie) => (
                    <li key={movie.id} className="acting-item">
                        {movie.release_date?.split('-')[0]} - <Link to={`/movies/${movie.id}`} className="movie-title-link">{movie.title}</Link> as {movie.character}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const getAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

export default PersonDetailsPage;
