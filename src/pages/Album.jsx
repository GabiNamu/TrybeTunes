import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    favorite: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    // const fave = await getFavoriteSongs();
    // const onlySongs = response.filter((song) => song.wrapperType === 'track');
    console.log(response);
    // console.log(onlySongs);
    this.setState({
      musics: response,
    });
  }

  saveFavoriteSongs = async (song) => {
    // const { name, checked } = event.target;
    // this.setState({
    //   favorite: checked,
    // });
    const response = await addSong(song);
    return response;
  };

  render() {
    const { musics, favorite } = this.state;
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
