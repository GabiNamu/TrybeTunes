import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loding from '../pages/Loding';
import { getUser } from '../services/userAPI';
import '../css/header.css';
import logo from '../img/logo.png';

class Header extends Component {
  state = {
    name: undefined,
    image: undefined,
  };

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    const response = await getUser();
    console.log(response);
    this.setState({
      name: response,
      image: response.image,
    });
    return response;
  };

  render() {
    const { name, image } = this.state;
    if (name === undefined) {
      return <Loding />;
    }
    return (
      <header data-testid="header-component" className="container-header">
        <Link to="/">
          <img src={ logo } alt="logo" />
        </Link>
        <nav className="nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link-header"
          >
            Pesquisa
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link-header"
          >
            Favoritas
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link-header"
          >
            Perfil
          </Link>
        </nav>
        <div className="container-profile-header">
          <img
            src={ image !== undefined && image }
            alt="profile"
            className="img-header"
          />
          <h3 data-testid="header-user-name" className="user-header">{ name.name }</h3>
        </div>
      </header>
    );
  }
}

export default Header;
