import React from "react";
import { MovieType } from "../../types";
import "./MovieCard.scss";
import { useNavigate } from "react-router";

interface MovieCardProps {
  movieData: MovieType;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieData }) => {
  const navigate = useNavigate();
  return (
    <div className="movieCard">
      <div className="poster">
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <div className="movieInfo">
        <div className="titles">
          <h2>IMDB ID</h2>
          <h2>Title</h2>
          <h2>Release Date</h2>
          <h2>Type</h2>
        </div>
        <div className="details">
          <div className="detail">
            <h3>{movieData.imdbID}</h3>
          </div>
          <div className="detail">
            <h3>{movieData.Title}</h3>
          </div>
          <div className="detail">
            <h3>{movieData.Year}</h3>
          </div>
          <div className="detail">
            <h3>{movieData.Type}</h3>
          </div>
          <div className="detail">
            <button
              onClick={() => navigate(`/${movieData.imdbID}`)}
              className="desktopBtn"
            >
              See Details
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(`/${movieData.imdbID}`)}
        className="mobileBtn"
      >
        See Details
      </button>
    </div>
  );
};

export default MovieCard;
