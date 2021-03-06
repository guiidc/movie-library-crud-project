import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      movie: {},
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchMovie();
  }

  handleSubmit(updatedMovie) {
    this.fetchUpdate(updatedMovie);
  }

  fetchMovie = async () => {
    try {
      const { match: { params: { id } } } = this.props;
      const response = await movieAPI.getMovie(id);
      this.setState({
        status: 'done',
        movie: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  fetchUpdate = (movieToUpdate) => {
    movieAPI.updateMovie(movieToUpdate);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequired;

export default EditMovie;
