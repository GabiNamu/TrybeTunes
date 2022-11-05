import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loding from './Loding';

class ProfileEdit extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    redirect: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      loading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveUserInfo = async () => {
    this.setState({
      loading: true,
    });
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { loading, name, email, description, image, redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <Loding />}
        <form action="">
          <input
            type="text"
            data-testid="edit-input-name"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            data-testid="edit-input-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            value={ description }
            onChange={ this.handleChange }
            data-testid="edit-input-description"
          />
          <input
            type="text"
            data-testid="edit-input-image"
            onChange={ this.handleChange }
            value={ image }
            name="image"
          />
          <button
            type="button"
            disabled={ name === ''
            || email === ''
            || !email.includes('@')
            || !email.includes('.com')
            || image === ''
            || description === '' }
            data-testid="edit-button-save"
            onClick={ this.saveUserInfo }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
