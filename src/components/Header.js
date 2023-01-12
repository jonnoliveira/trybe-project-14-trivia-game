import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    url: '',
    score: 0,
  };

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ url: hash });
  };

  render() {
    const { name } = this.props;
    const { url, score } = this.state;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="profile"
          src={ `https://www.gravatar.com/avatar/${url}` }
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
});

export default connect(mapStateToProps)(Header);
