import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loding from './Loding';
import '../css/profileEdit.css';

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
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        {loading
          ? (
            <div className="loading-profile">
              <Loding />
            </div>)
          : (
            <form action="" className="form-profileEdit">
              <div>
                <div className="container-img-profileEdit">
                  <img src={ image } alt="foto de perfil" className="img-profileEdit" />
                </div>
                <input
                  type="text"
                  id="image"
                  placeholder="Insira um link"
                  className="input-img-profileEdit"
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                  value={ image }
                  name="image"
                />
              </div>
              <div className="input-profileEdit">
                <label htmlFor="name" className="label-profileEdit">
                  Nome
                  <p className="p-profileEdit">
                    Fique à vontade para usar o seu nome social
                  </p>
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    className="inputs-profileEdit"
                    value={ name }
                    id="name"
                    name="name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email" className="label-profileEdit">
                  E-mail
                  <p
                    className="p-profileEdit"
                  >
                    Escolha um e-mail que consulte diariamente

                  </p>
                  <input
                    type="email"
                    id="email"
                    className="inputs-profileEdit"
                    data-testid="edit-input-email"
                    value={ email }
                    name="email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label
                  htmlFor="description"
                  className="textarea-profileEdit
            label-profileEdit"
                >
                  Descrição
                  <textarea
                    name="description"
                    id="description"
                    className="input-textarea-profileEdit"
                    cols="30"
                    rows="10"
                    value={ description }
                    placeholder="Sobre mim"
                    onChange={ this.handleChange }
                    data-testid="edit-input-description"
                  />
                </label>
                <button
                  type="button"
                  disabled={ name === ''
            || email === ''
            || !email.includes('@')
            || !email.includes('.com')
            || image === ''
            || description === '' }
                  className="button-save-profileEdit"
                  data-testid="edit-button-save"
                  onClick={ this.saveUserInfo }
                >
                  Salvar
                </button>
              </div>
            </form>)}
      </div>
    );
  }
}

export default ProfileEdit;
