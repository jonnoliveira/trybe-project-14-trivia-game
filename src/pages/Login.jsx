import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addEmail, addName } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  onClickPlay = async () => {
    const data = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    localStorage.setItem('token', data.token);
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.btnLoginValidation();
    });
  };

  btnLoginValidation = () => {
    const { email, name } = this.state;

    // VALIDAÇÃO DO EMAIL
    const emailPattern = (
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    );
    const validEmail = emailPattern.test(email);

    // VALIDAÇÃO DO NOME
    const validName = name.length > 0;

    if (validEmail && validName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  toGlobalState = async () => {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;

    await this.onClickPlay();

    dispatch(addName(name));
    dispatch(addEmail(email));

    history.push('/game');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <section>
        <div>
          <form action="">

            <label htmlFor="name">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Digite o seu melhor nome"
                onChange={ this.onChangeHandler }
                data-testid="input-player-name"
              />
            </label>

            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu melhor email"
                onChange={ this.onChangeHandler }
                data-testid="input-gravatar-email"
              />
            </label>

            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.toGlobalState }
              data-testid="btn-play"
            >
              Play
            </button>

            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
                href="/settings"
              >
                Settings
              </button>
            </Link>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
