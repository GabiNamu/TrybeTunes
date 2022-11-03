import React, { Component } from 'react';
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
    return (
      <header data-testid="header-component">
        {name === undefined
          ? <Loding />
          : <h3 data-testid="header-user-name">{ name.name }</h3>}
      </header>
    );
  }
}

export default Header;
