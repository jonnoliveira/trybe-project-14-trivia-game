import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAssertions, addScore, addIndex } from '../redux/actions';
import home from '../images/home.svg';

import '../css/Ranking.css';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.retrievingPlayers();
  }

  goHome = () => {
    const { history, dispatch, index } = this.props;

    let indexPlayer = index;
    indexPlayer += 1;

    dispatch(addAssertions(0));
    dispatch(addScore(0));
    dispatch(addIndex(indexPlayer));

    history.push('/');
  };

  retrievingPlayers = () => {
    const players = JSON.parse(localStorage.getItem('players'));
    const orderPlayers = players.sort((a, b) => b.score - a.score);
    this.setState({ players: orderPlayers });

    if (localStorage.getItem('ranking')) {
      localStorage.removeItem('ranking');
      localStorage.setItem('ranking', JSON.stringify(orderPlayers));
      return;
    }
    localStorage.setItem('ranking', JSON.stringify(orderPlayers));
  };

  render() {
    const { players } = this.state;
    return (
      <section data-testid="ranking-title" className="ranking-container">
        <div className="ranking-players-container">
          {
            players.map(({ index, name, src, assertions, score }) => (
              <div
                key={ `${name}-${index}-${assertions}` }
                className="ranking-players"
              >
                <img src={ src } alt={ name } />
                <h3 data-testid={ `player-name-${index}` }>{ name }</h3>
                <p data-testid={ `player-score-${index}` }>
                  S:
                  { ' ' }
                  { score }
                </p>
                <p>
                  A:
                  { ' ' }
                  { assertions }
                </p>
              </div>
            ))
          }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          <img src={ home } alt="Home icon" />
          Home
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
