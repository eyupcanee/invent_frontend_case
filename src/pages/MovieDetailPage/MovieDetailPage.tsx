import { useEffect, useState } from "react";
import "./MovieDetailPage.scss";
import { useParams, useNavigate } from "react-router";
import { MovieDetailType } from "../../types";
import { getMoviebyIMDBId } from "../../api/movieApi";

const MovieDetailPage = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetailType>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const dataRes = await getMoviebyIMDBId(id as string);
      setMovieDetail(dataRes.data);
      setLoading(false);
    };

    getData();
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <div className="container">
          <div className="loadingText">
            <h1>LOADING...</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="movieDetail">
      <div className="container">
        <div className="movieDetailContent">
          <div className="header">
            <h1>{movieDetail?.Title}</h1>
          </div>
          <div className="movieInfo">
            <div className="poster">
              <img src={movieDetail?.Poster} alt={movieDetail?.Title} />
            </div>
            <div className="infos">
              <h2>
                <span>Title:</span> {movieDetail?.Title}
              </h2>
              <h2>
                <span>IMDB ID:</span>
                {movieDetail?.imdbID}
              </h2>
              <h2>
                <span>Director:</span>
                {movieDetail?.Director}
              </h2>
              <h2>
                <span>Genre:</span>
                {movieDetail?.Genre}
              </h2>
              <h2>
                <span>Language:</span>
                {movieDetail?.Language}
              </h2>
              <h2>
                <span>Year:</span>
                {movieDetail?.Year}
              </h2>
              <h2>
                <span>Type:</span>
                {movieDetail?.Type}
              </h2>
              <h2>
                <span>Actors:</span>
                {movieDetail?.Actors}
              </h2>
              <p>
                <span>Plot:</span>
                {movieDetail?.Plot}
              </p>
              <div className="back">
                <button onClick={() => navigate(`/`)}>Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
