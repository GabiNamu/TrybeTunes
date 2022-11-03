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
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  SaveUserName = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const response = await createUser({ name });
    this.setState({
      redirect: true,
    });
    console.log(response);
  };

  render() {
    const { name, loading, redirect } = this.state;
    const number = 3;
    if (redirect === true) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        { loading ? <Loding />
          : (
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
            </form>)}
      </div>
    );
  }
}

export default Login;
