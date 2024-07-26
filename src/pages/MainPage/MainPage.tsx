import { useEffect, useState } from "react";
import { getMoviesByName, getMoviesByOptions } from "../../api/movieApi";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import {
  changeTitle,
  changeType,
  changeYear,
} from "../../lib/features/movieOption/movieOptionSlice";
import "./MainPage.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MovieType } from "../../types";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const title: string = useAppSelector(
    (state) => state.movieOptionReducer.title
  );
  const type: string = useAppSelector((state) => state.movieOptionReducer.type);
  const year: string | undefined = useAppSelector(
    (state) => state.movieOptionReducer.year
  );
  const [headerTitle, setHeaderTitle] = useState<String>(title);

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalRes, setTotalRes] = useState<number>(0);

  const handleSubmit = async () => {
    if (year !== undefined) {
      const dataRes = await getMoviesByOptions(title, type, page, year);
      setMovies(dataRes.data.Search);
      setTotalRes(dataRes.data.totalResults);
      setHeaderTitle(title);
    } else {
      const dataRes = await getMoviesByName(title, type, page);
      setMovies(dataRes.data.Search);
      setTotalRes(dataRes.data.totalResults);
      setHeaderTitle(title);
    }
  };

  const handleClearFilter = async () => {
    dispatch(changeTitle("Pokemon"));
    dispatch(changeYear(""));
    dispatch(changeType("movie"));
    const dataRes = await getMoviesByName("Pokemon", type, page);
    setMovies(dataRes.data.Search);
    setTotalRes(dataRes.data.totalResults);
    setHeaderTitle(title);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const getData = async () => {
      if (year !== undefined) {
        const dataRes = await getMoviesByOptions(title, type, page, year);
        setMovies(dataRes.data.Search);
        setTotalRes(dataRes.data.totalResults);
      } else {
        const dataRes = await getMoviesByName(title, type, page);
        setMovies(dataRes.data.Search);
        setTotalRes(dataRes.data.totalResults);
      }
    };

    getData();
  }, [page]);
  return (
    <section className="mainPage">
      <div>
        <div className="container">
          <div className="pageContent">
            <h1>
              You see the search results for <span>{headerTitle}</span>
            </h1>
            <div className="movieGrid">
              <div className="searchBar">
                <form action="submit" onSubmit={handleSubmit}>
                  <div className="options">
                    <div className="searchInput">
                      <label htmlFor="search">Movie Name</label>
                      <input
                        value={title}
                        type="text"
                        required
                        onChange={(e) => dispatch(changeTitle(e.target.value))}
                      />
                    </div>
                    <div className="yearOptions">
                      <label htmlFor="year">Year</label>
                      <input
                        value={year}
                        placeholder="YYYY"
                        id="year"
                        type="number"
                        min="1902"
                        max="2030"
                        onChange={(e) => dispatch(changeYear(e.target.value))}
                      />
                    </div>
                    <div className="typeOptions">
                      <label htmlFor="movie">Movie</label>
                      <input
                        type="radio"
                        id="movie"
                        name="type"
                        value="movie"
                        required
                        onChange={(e) => dispatch(changeType("movie"))}
                      />
                    </div>
                    <div className="typeOptions">
                      <label htmlFor="series">Series</label>
                      <input
                        type="radio"
                        id="series"
                        name="type"
                        value="series"
                        required
                        onChange={(e) => dispatch(changeType("series"))}
                      />
                    </div>
                    <div className="typeOptions">
                      <label htmlFor="episode">Episode</label>
                      <input
                        type="radio"
                        id="episode"
                        name="type"
                        value="episode"
                        required
                        onChange={(e) => dispatch(changeType("episode"))}
                      />
                    </div>
                  </div>
                  <div className="searchButton">
                    <div onClick={handleClearFilter}>Clear Filter</div>
                    <input type="submit" value={"Search"} />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {movies ? (
            movies.map((movie) => <MovieCard movieData={movie} />)
          ) : (
            <div className="noMovie">
              <h1>
                There is not any movie. Please search another or clear filter.
              </h1>
            </div>
          )}
          <div className="pagination">
            <button
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <div className="current">{page}</div>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={page === totalRes / 10}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
