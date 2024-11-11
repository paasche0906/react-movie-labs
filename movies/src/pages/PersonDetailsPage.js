import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPeopleDetails, getMovieCredits, getExternalId } from '../api/tmdb-api';
import Spinner from '../components/spinner';
import InstagramIcon from '../images/ins icon.png';
import TikTokIcon from '../images/tiktok icon.png';


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
            <h1>{personDetails.name}</h1>
            <img src={`https://image.tmdb.org/t/p/w300${personDetails.profile_path}`} alt={personDetails.name} />
            <h2>Biography</h2>
            <p>{personDetails.biography || "No profile available."}</p>

            <div className="personal-info">
                <h2>Personal Info</h2>
                <div className="social-media-links" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                    {externalIds?.instagram_id && (
                        <a href={`https://www.instagram.com/${externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer">
                            <img src={InstagramIcon} alt="Instagram" style={{ width: '30px', height: '30px' }} />
                        </a>
                    )}
                    {externalIds?.tiktok_id && (
                        <a href={`https://www.tiktok.com/@${externalIds.tiktok_id}`} target="_blank" rel="noopener noreferrer">
                            <img src={TikTokIcon} alt="TikTok" style={{ width: '30px', height: '30px' }} />
                        </a>
                    )}
                </div>

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

            <h2>Known For</h2>
            <div>
                {movieCredits.cast.slice(0, 5).map((movie) => (
                    <div key={movie.id}>
                        <h3>
                            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                        </h3>
                        <p>Role: {movie.character}</p>
                    </div>
                ))}
            </div>

            <h2>Acting</h2>
            <ul>
                {movieCredits.cast.map((movie) => (
                    <li key={movie.id}>
                        {movie.release_date?.split('-')[0]} -
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link> as {movie.character}
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
