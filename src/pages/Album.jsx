import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loding from './Loding';
import '../css/album.css';

class Album extends Component {
  state = {
    musics: [],
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    console.log(response);
    const arrayMusics = response.map((music) => (
      { ...music, checked: false }
    ));
    this.setState({
      musics: arrayMusics,
      loading: true,
    });
    this.getSavedFavoriteSongs();
  }

  saveFavoriteSongs = async (song) => {
    const { musics } = this.state;
    const newMusics = musics.map((music) => {
      if (music.trackId === song.trackId) {
        if (music.checked) {
          music.checked = false;
        } else {
          music.checked = true;
        }
      }
      return music;
    });

    this.setState({
      loading: true,
      musics: newMusics,
    });
    if (song.checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    this.setState({
      loading: false,
    });
  };

  getSavedFavoriteSongs = async () => {
    const response = await getFavoriteSongs();
    const { musics } = this.state;
    musics.map((music) => {
      response.forEach((element) => {
        if (element.trackId === music.trackId) {
          music.checked = true;
        }
      });
      return music;
    });

    this.setState({
      loading: false,
      musics,
    });
  };

  render() {
    const { musics, favorite, loading } = this.state;
    return (
      <div data-testid="page-album" className="container-musics">
        <Header />
        <h1 data-testid="artist-name">
          { musics.length !== 0 && musics[0].artistName }
        </h1>

        <h3 data-testid="album-name">
          { musics.length !== 0 && musics[0].collectionName }
        </h3>
        <ul>
          {loading ? <Loding />
            : (
              musics.length !== 0
              && musics.filter((music) => music.trackName).map((song) => (
                <div key={ song.trackId }>

                  <li className="li-album">
                    <MusicCard
                      song={ song }
                      favorite={ favorite }
                      change={ () => this.saveFavoriteSongs(song) }
                      name={ song.trackName }
                      check={ song.checked }
                      music={ song.previewUrl }
                      id={ song.trackId }
                    />
                  </li>
                </div>
              )))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
