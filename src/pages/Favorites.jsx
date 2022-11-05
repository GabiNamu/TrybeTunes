import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loding from './Loding';

class Favorites extends Component {
  state = {
    listFavorites: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const favorite = await getFavoriteSongs();
    console.log(favorite);
    this.setState({
      loading: false,
      listFavorites: favorite,
    });
  }

  handleChange = async (song) => {
    const { listFavorites } = this.state;
    this.setState({
      loading: true,
    });
    await removeSong(song);
    const index = listFavorites.findIndex((music) => music.trackId === song.trackId);
    console.log(index);
    listFavorites.splice(index, 1);
    this.setState({
      loading: false,
    });
    console.log(listFavorites);
  };

  render() {
    const { loading, listFavorites } = this.state;
    if (loading === true) {
      return <Loding />;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        { listFavorites.length !== 0
        && (
          <ul>
            {listFavorites.map((song) => (
              <li key={ song.trackId }>
                <MusicCard
                  song={ song }
                  name={ song.trackName }
                  checked={ song.checked }
                  change={ () => this.handleChange(song) }
                  check={ song.checked }
                  music={ song.previewUrl }
                  id={ song.trackId }
                />
              </li>
            ))}
          </ul>)}
      </div>
    );
  }
}

export default Favorites;
