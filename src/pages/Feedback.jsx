import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addAssertions, addScore, addIndex } from '../redux/actions';
import happy from '../images/happy.svg';
import sad from '../images/sad.svg';

import '../css/Feedback.css';

class Feedback extends Component {
  feedbackMsg = () => {
    const { assertions } = this.props;
    const THREE = 3;

    if (assertions < THREE) {
      return (
        <div className="feedback-msg">
          <h2 data-testid="feedback-text">Could be better...</h2>
          <img src={ sad } alt="Sad face icon" />
        </div>
      );
    }
    return (
      <div className="feedback-msg">
        <h2 data-testid="feedback-text">Well Done!</h2>
        <img src={ happy } alt="Happy face icon" />
      </div>
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
      <section className="feedback-container">
        <Header />
        <div className="feedback-result-container">
          <div className="feedback-result">

            <h1>RESULTADO FINAL:</h1>
            {
              this.feedbackMsg()
            }
            <div className="feedback-score">
              <h3>Placar Final:</h3>
              <p data-testid="feedback-total-score">{ score }</p>
            </div>
            <div className="feedback-questions">
              <h3>Perguntas certas:</h3>
              <p data-testid="feedback-total-question">{ assertions }</p>
            </div>
            <div className="feedback-buttons">
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
