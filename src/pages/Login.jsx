import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loding from './Loding';
import '../css/login.css';
import logo from '../img/logo.png';

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
      <div data-testid="page-login" className="container-background-login">
        <div className="container">
          <img src={ logo } alt="logo" className="logo-login" />
          { loading ? <Loding />
            : (
              <form action="" className="form">
                <input
                  className="input"
                  type="text"
                  data-testid="login-name-input"
                  name="name"
                  placeholder="qual é o seu nome?"
                  value={ name }
                  onChange={ this.handleChange }
                />
                <button
                  className="button"
                  type="button"
                  disabled={ name.length < number }
                  data-testid="login-submit-button"
                  onClick={ this.SaveUserName }
                >
                  Entrar
                </button>
              </form>)}
        </div>
      </div>
    );
  }
}

export default Login;
