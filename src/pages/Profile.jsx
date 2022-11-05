import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loding from './Loding';

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
    // if (loading === true) {
    //   return <Loding />;
    // }
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loding />}
        { userInfo !== ''
        && (
          <div>
            <img
              src={ userInfo.image }
              alt={ userInfo.name }
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
            <h3>{userInfo.name}</h3>
            <p>{userInfo.email}</p>
            <p>{userInfo.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
