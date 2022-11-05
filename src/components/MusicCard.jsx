import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { name, music, id, saveFavoriteSongs, check } = this.props;
    return (
      <div>
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ music } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label
          htmlFor={ id }
          data-testid={ `checkbox-music-${id}` }
        >
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ id }
            checked={ check }
            onChange={ saveFavoriteSongs }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  music: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default MusicCard;
