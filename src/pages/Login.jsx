import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
      load: undefined,
    };
  }

  // componentDidUpdate() {
  //   const { loading } = this.state;
  //   console.log(loading);
  // }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  isLoading = () => {
    const { loading } = this.state;
    if (loading === true) {
      this.setState({
        load: 'carregando...',
      });
    } else {
      this.setState({
        load: undefined,
      });
    }
  };

  SaveUserName = async () => {
    const { name } = this.state;
    this.isLoading();
    const response = await createUser({ name });
    console.log(response);
    this.setState = ({
      loading: false,
    });
    this.isLoading();
  };

  render() {
    const { name, load } = this.state;
    const number = 3;
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
          <p>{ load }</p>
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
