import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addAssertions, addScore, addIndex } from '../redux/actions';

class Feedback extends Component {
  feedbackMsg = () => {
    const { assertions } = this.props;
    const THREE = 3;

    if (assertions < THREE) {
      return (
        <h2 data-testid="feedback-text">Could be better...</h2>
      );
    }
    return (
      <h2 data-testid="feedback-text">Well Done!</h2>
    );
  };

  newGame = () => {
    const { history, dispatch, index } = this.props;

    let indexPlayer = index;
    indexPlayer += 1;

    dispatch(addAssertions(0));
    dispatch(addScore(0));
    dispatch(addIndex(indexPlayer));

    history.push('/');
  };

  goRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <section>
        <Header />
        <div>
          <h1>RESULTADO</h1>
          {
            this.feedbackMsg()
          }
          <div>
            <h3>Placar Final:</h3>
            <p data-testid="feedback-total-score">{ score }</p>
          </div>
          <div>
            <h3>Perguntas certas:</h3>
            <p data-testid="feedback-total-question">{ assertions }</p>
          </div>
          <div>
            <button
              type="button"
              onClick={ this.newGame }
              data-testid="btn-play-again"
            >
              Play Again

            </button>
            <button
              type="button"
              onClick={ this.goRanking }
              data-testid="btn-ranking"
            >
              Ranking
            </button>

          </div>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  index: state.player.index,
});

export default connect(mapStateToProps)(Feedback);
