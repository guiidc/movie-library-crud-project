import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      loadingStatus: true,
      movie: {},
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

   fetchMovie = async () => {
     try {
       const { match: { params: { id } } } = this.props;
       const response = await movieAPI.getMovie(id);
       this.setState({
         loadingStatus: false,
         movie: response,
       });
     } catch (error) {
       console.log(error);
     }
   }

   deleteMovie = () => {
     const { movie: { id } } = this.state;
     movieAPI.deleteMovie(id);
   }

   render() {
     const { loadingStatus } = this.state;
     if (loadingStatus) return <Loading />;

     const { movie: {
       title, storyline, imagePath, genre, rating, subtitle } } = this.state;

     const { match: { params: { id } } } = this.props;

     return (
       <div data-testid="movie-details">
         <img alt="Movie Cover" src={ `../${imagePath}` } />
         <h2>{ `Title: ${title}` }</h2>
         <p>{ `Subtitle: ${subtitle}` }</p>
         <p>{ `Storyline: ${storyline}` }</p>
         <p>{ `Genre: ${genre}` }</p>
         <p>{ `Rating: ${rating}` }</p>
         <Link to="/">VOLTAR </Link>
         <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
         <Link to="/" onClick={ this.deleteMovie }>DELETAR</Link>
       </div>
     );
   }
}

MovieDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequired;

export default MovieDetails;
