import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loding from './Loding';

class Album extends Component {
  state = {
    musics: [],
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      musics: response,
    });
    this.getSavedFavoriteSongs();
  }

  isChecked = (song) => {
    const { musics } = this.state;
    const a = musics.findIndex((element) => element.trackId === song.trackId);
    console.log(musics[a]);
    if (musics[a].checked === undefined || musics[a].checked === false) {
      musics[a].checked = true;
      return musics[a].checked;
    }
    musics[a].checked = false;
    return musics[a].checked;
  };

  saveFavoriteSongs = async (song) => {
    this.isChecked(song);
    this.setState({
      loading: true,
    });
    await addSong(song);
    this.setState({
      loading: false,
    });
  };

  getSavedFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const response = await getFavoriteSongs();
    const array = [];
    const { musics } = this.state;
    response.forEach((song) => {
      const all = musics.findIndex((element) => element.trackId === song.trackId);
      array.push(all);
    });
    array.forEach((number) => {
      musics[number].checked = true;
      return musics[number].checked;
    });
    this.setState({
      loading: false,
    });
  };

  render() {
    const { musics, favorite, loading } = this.state;
    if (loading === true) {
      return <Loding />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">
          { musics.length !== 0 && musics[0].artistName }
        </h1>

        <h3 data-testid="album-name">
          {musics.length !== 0 && musics[0].collectionName }
        </h3>
        <ul>
          {musics.length !== 0
          && musics.filter((music) => music.trackName).map((song) => (
            <div key={ song.trackId }>
              <li>
                <MusicCard
                  song={ song }
                  favorite={ favorite }
                  saveFavoriteSongs={ () => this.saveFavoriteSongs(song) }
                  name={ song.trackName }
                  check={ song.checked }
                  music={ song.previewUrl }
                  id={ song.trackId }
                />
              </li>
            </div>
          ))}
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
