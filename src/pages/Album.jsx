import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    response.shift();
    this.setState({
      musics: response,
    });
  }

  render() {
    const { musics } = this.state;
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
          && musics.map((song) => (
            <div key={ song.trackId }>
              <li>
                <MusicCard
                  song={ song }
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
