import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAssertions, addScore, addIndex } from '../redux/actions';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.retrivingPlayers();
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

  retrivingPlayers = () => {
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
      <section data-testid="ranking-title">
        <div>
          {
            players.map(({ index, name, src, assertions, score }) => (
              <div key={ name }>
                <img src={ src } alt={ name } />
                <h3 data-testid={ `player-name-${index}` }>{ name }</h3>
                <p data-testid={ `player-score-${index}` }>{ score }</p>
                <p>{ assertions }</p>
              </div>
            ))
          }
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goHome }
          >
            Home
          </button>
        </div>
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
