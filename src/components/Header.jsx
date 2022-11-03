import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loding from '../pages/Loding';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">{ name.name }</h3>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>

        </nav>
      </header>
    );
  }
}

export default Header;
