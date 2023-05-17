import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addSrc } from '../redux/actions';

import '../css/header.css';

class Header extends Component {
  state = {
    src: '',
  };

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture = () => {
    const { email, dispatch } = this.props;
    const hash = md5(email).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ src });

    dispatch(addSrc(src));
  };

  render() {
    const { name, score } = this.props;
    const { src } = this.state;

    return (
      <div className="header-container">
        <img
          data-testid="header-profile-picture"
          alt="profile"
          src={ src }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
