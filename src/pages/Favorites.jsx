import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loding from './Loding';
import '../css/favorites.css';

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
    // if (loading === true) {
    //   return <Loding />;
    // }
    return (
      <div data-testid="page-favorites" className="container-favorites">
        <Header />
        <div className="h1-ul">
          <div className="container-h1">
            <h1 className="h1-favorites">Músicas Favoritas</h1>
          </div>
          {listFavorites.length !== 0
            && (
              <ul className="ul-favorites">
                {listFavorites.map((song) => (
                  <div key={ song.trackId }>
                    <div className="musics-album">
                      <li className="li-album">
                        { loading === true ? <Loding /> : (
                          <MusicCard
                            song={ song }
                            name={ song.trackName }
                            checked={ song.checked }
                            change={ () => this.handleChange(song) }
                            check={ song.checked }
                            music={ song.previewUrl }
                            id={ song.trackId }
                          />
                        )}
                      </li>
                    </div>
                  </div>
                ))}
              </ul>)}
        </div>
      </div>
    );
  }
}

export default Favorites;
