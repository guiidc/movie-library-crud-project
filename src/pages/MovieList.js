import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import { Loading } from '../components';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      loadingStatus: true,
      movies: [],
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    try {
      const response = await movieAPI.getMovies();
      this.setState({
        loadingStatus: false,
        movies: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { loadingStatus, movies } = this.state;

    // Render Loading here if the request is still happening
    if (loadingStatus) return <Loading />;

    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
      </div>
    );
  }
}

export default MovieList;
