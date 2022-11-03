import React, { Component } from 'react';
import Header from '../components/Header';
import Loding from './Loding';
import searchAlbumsAP from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artist: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchArtistAlbum = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAP(artist);
    this.setState({
      loading: false,
    });
    console.log(response);
  };

  render() {
    const { artist, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loding />
          : (
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
                onClick={ this.fetchArtistAlbum }
              >
                Pesquisar
              </button>
            </form>)}
      </div>
    );
  }
}

export default Search;
