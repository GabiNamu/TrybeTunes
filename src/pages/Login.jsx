import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    const { name, loading } = this.state;
    this.setState = {
      loading: true,
    };
    const response = await createUser({ name });
    console.log(response);
    this.setState = {
      loading: false,
    };
    return response;
  };

//   redirectPage = async () => {
//     const func = await this.SaveUserName();
//     if (func === 'OK') {
//       return <Redirect to="/search" />;
//     }
//     return <h2>hi</h2>;
//   };

  render() {
    const { name, loading } = this.state;
    const number = 3;
    if (loading === true) {
        console.log('entrei');
        return <h1>Carregando ...</h1>;
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
