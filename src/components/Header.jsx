import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loding from '../pages/Loding';
import { getUser } from '../services/userAPI';
import '../css/header.css';

class Header extends Component {
  state = {
    name: undefined,
  };

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    const response = await getUser();
    console.log(response);
    this.setState({
      name: response,
    });
    return response;
  };

  render() {
    const { name } = this.state;
    if (name === undefined) {
      return <Loding />;
    }
    return (
      <header data-testid="header-component" className="container-header">
        <h3 className="title-header">TrybeTunes</h3>
        <nav className="nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link-header"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link-header"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link-header"
          >
            Profile
          </Link>
        </nav>
        <h3 data-testid="header-user-name" className="user-header">{ name.name }</h3>
      </header>
    );
  }
}

export default Header;
