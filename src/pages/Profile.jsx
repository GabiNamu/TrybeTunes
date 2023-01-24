import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loding from './Loding';
import '../css/profile.css';

class Profile extends Component {
  state = {
    loading: false,
    userInfo: '',
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      userInfo: user,
      loading: false,
    });
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        { userInfo !== ''
        && (
          <div>
            <div className="img-profile-container">
              <img
                className="img-profile"
                src={ userInfo.image }
                alt={ userInfo.name }
                data-testid="profile-image"
              />
            </div>
            <div className="info-profile-container">
              <h3 className="title-profile">Nome</h3>
              <h3 className="info-profile">{userInfo.name}</h3>
              <p className="title-profile">Email</p>
              <p className="info-profile">{userInfo.email}</p>
              <p className="title-profile">Descrição</p>
              <p className="info-profile">{userInfo.description}</p>
              <Link to="/profile/edit" className="link-profile">Editar perfil</Link>
            </div>
          </div>
        )}
        <div className="loading-profile">
          {loading && <Loding />}
        </div>
      </div>
    );
  }
}

export default Profile;
