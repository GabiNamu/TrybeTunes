import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            name="artist"
            onChange={ this.handleChange }
            value={ artist }
          />
          <button
            type="button"
            disabled={ artist.length < 2 }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
