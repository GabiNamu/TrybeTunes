import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loding from './Loding';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  SaveUserName = async () => {
    const { name } = this.state;
    this.setState = {
      loading: true,
    };
    const response = await createUser({ name });
    console.log(response);
    this.setState = {
      loading: false,
    };
  };

  render() {
    const { name, loading } = this.state;
    const number = 3;
    if (loading === true) {
      console.log('entrei');
      return <Loding />;
    }
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form action="">
          <input
            type="text"
            placeholder="Nome"
            data-testid="login-name-input"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ name.length < number }
            data-testid="login-submit-button"
            onClick={ this.SaveUserName }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
