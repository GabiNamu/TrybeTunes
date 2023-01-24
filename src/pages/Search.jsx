import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loding from './Loding';
import searchAlbumsAP from '../services/searchAlbumsAPI';
import '../css/search.css';

let prev = '';

class Search extends Component {
  state = {
    artist: '',
    loading: false,
    name: false,
    artistAlbums: undefined,
    notFound: false,
  };

  componentDidUpdate(prevProps, prevState) {
    prev = prevState.artist;
  }

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
    const istrue = response.length === 0;
    console.log(response);
    console.log(istrue);
    this.setState({
      loading: false,
      artist: '',
      artistAlbums: response,
      name: true,
      notFound: istrue,
    });
  };

  render() {
    const { artist, loading, artistAlbums, name, notFound } = this.state;
    return (
      <div data-testid="page-search" className="box-search">
        <Header />
        { loading ? <Loding />
          : (
            // <div className="container-search">
            <form action="" className="container-search">
              <div className="form-search">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  name="artist"
                  className="search-input"
                  onChange={ this.handleChange }
                  placeholder="NOME DO ARTISTA"
                  value={ artist }
                />
                <button
                  type="button"
                  disabled={ artist.length < 2 }
                  className="search-button"
                  data-testid="search-artist-button"
                  onClick={ this.fetchArtistAlbum }
                >
                  Pesquisar
                </button>
              </div>
            </form>
            // </div>
          )}

        { name && !notFound
          ? <h2 className="title-search">{`Resultado de álbuns de: ${prev}`}</h2> : ''}
        <div className="container-album">
          { artistAlbums !== undefined && artistAlbums !== []
            ? artistAlbums.map((album) => (
              <div key={ album.collectionId } className="album-search">
                <Link
                  className="link-search"
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.collectionName }
                    className="img-search"
                  />
                </Link>
                <h3 className="h3-search">{album.collectionName}</h3>
                <p className="artist-search">{album.artistName}</p>
              </div>)) : '' }
        </div>
        { notFound ? <h1>Nenhum álbum foi encontrado</h1> : ''}
      </div>
    );
  }
}

export default Search;
