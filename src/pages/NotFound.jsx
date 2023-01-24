import React, { Component } from 'react';
import '../css/notFound.css';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="container-notFound">
        <div className="container-title-notFound">
          <h1 className="h1-notFound">Ops!</h1>
          <h2
            className="h2-notFound"
          >
            A página que você esta procurando não foi encontrada

          </h2>
        </div>
      </div>
    );
  }
}

export default NotFound;
