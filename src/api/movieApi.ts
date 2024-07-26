import axios from "axios";

const api_url = process.env.REACT_APP_API_URL;
const api_key = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: api_url,
  timeout: 10000,
});

export const getMoviesByName = async (
  name: string,
  type: string,
  page: number
) => {
  const response = await api.get("", {
    params: {
      apikey: api_key,
      s: name,
      page: page,
      type: type,
    },
  });

  return response;
};

export const getMoviesByOptions = async (
  name: string,
  type: string,
  page: number,
  year: string
) => {
  const response = await api.get("", {
    params: {
      apikey: api_key,
      s: name,
      y: year,
      type: type,
      page: page,
    },
  });

  return response;
};

export const getMoviebyIMDBId = async (imdbID: string) => {
  const response = await api.get("", {
    params: {
      apikey: api_key,
      i: imdbID,
    },
  });

  return response;
};
