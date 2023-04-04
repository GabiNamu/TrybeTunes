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
        <div className="all-album">
          <div className="title-album">
            { musics.length !== 0
             && <img src={ musics[0].artworkUrl100 } alt="album" className="img-album" />}
            <div className="name-album">
              <h1 data-testid="album-name" className="h1-album">
                { musics.length !== 0 && musics[0].collectionName }
              </h1>
              <h3 data-testid="artist-name" className="h3-album">
                { musics.length !== 0 && musics[0].artistName }
              </h3>
            </div>
          </div>
          <ul className="ul-album">
            {loading ? <Loding />
              : (
                musics.length !== 0
              && musics.filter((music) => music.trackName).map((song) => (
                <div key={ song.trackId }>
                  <div className="musics-album">
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
                </div>
              )))}
          </ul>
        </div>
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
