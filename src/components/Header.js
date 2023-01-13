import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import { addScore } from '../redux/actions';

class Header extends Component {
  state = { url: '' };

  componentDidMount() {
    this.getProfilePicture();
    // const { dispatch } = this.props;
    // dispatch(addScore(2));
  }

  getProfilePicture = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ url: hash });
  };

  render() {
    const { name, score } = this.props;
    const { url } = this.state;

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
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
