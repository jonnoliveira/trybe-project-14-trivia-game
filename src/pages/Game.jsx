import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addAssertions, addScore } from '../redux/actions';
import '../css/Game.css';

const ERROR_DATA = 3;
const DELTA = 0.5;
class Game extends Component {
  state = {
    questions: [{
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
    }],
    mixAnswers: [],
    curr: 0,
    counter: 30,
    isDisabled: true,
    answered: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.fetchQuestionsAPI(token);
    this.stopwatch();
  }

  fetchQuestionsAPI = async (token) => {
    const { history, category, difficulty } = this.props;
    let QUESTIONS_API = `https://opentdb.com/api.php?amount=5&token=${token}`;

    if (category !== 'any' && difficulty === 'any') {
      QUESTIONS_API = `https://opentdb.com/api.php?amount=5&category=${category}&token=${token}`;
    }
    if (category !== 'any' && difficulty !== 'any') {
      QUESTIONS_API = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&token=${token}`;
    }

    const response = await fetch(QUESTIONS_API);
    const data = await response.json();

    if (await data.response_code === ERROR_DATA) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }

    this.setState({
      questions: await data.results,
    }, () => { this.newAnswers(); });
  };

  newAnswers = () => {
    const { questions, curr } = this.state;
    const { correct_answer: correct, incorrect_answers: incorrect } = questions[curr];
    const answers = [correct, ...incorrect];
    answers.sort(() => Math.random() - DELTA);
    this.setState({ mixAnswers: answers });
  };

  checkQuestion = ({ target }) => {
    const { dispatch, score, assertions } = this.props;
    const { questions, curr, counter } = this.state;
    const { correct_answer: correct, difficulty } = questions[curr];
    const isCorrect = target.value === correct;
    const THREE = 3;
    const TEN = 10;
    let scoreValue = 0;
    let totalAssertions = assertions;
    if (isCorrect && difficulty === 'easy') {
      scoreValue = (TEN + (1 * counter) + score);
      totalAssertions += 1;
      dispatch(addScore(scoreValue));
      dispatch(addAssertions(totalAssertions));
    }
    if (isCorrect && difficulty === 'medium') {
      scoreValue = (TEN + (2 * counter) + score);
      totalAssertions += 1;
      dispatch(addScore(scoreValue));
      dispatch(addAssertions(totalAssertions));
    }
    if (isCorrect && difficulty === 'hard') {
      scoreValue = (TEN + (THREE * counter) + score);
      totalAssertions += 1;
      dispatch(addScore(scoreValue));
      dispatch(addAssertions(totalAssertions));
    }
  };

  toggleStyle = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.style.backgroundColor) {
        button.style.backgroundColor = '';
        button.style.color = '';
      } else if (button.className === 'correctAnswer') {
        button.style.backgroundColor = 'rgb(84, 135, 69)';
        button.style.color = '#fff';
        button.disabled = 'true';
      } else if (button.className === 'wrongAnswer') {
        button.style.backgroundColor = '#3f1f26';
        button.style.color = '#fff';
        button.disabled = 'true';
      }
    });
  };

  handleClick = () => {
    this.setState({ answered: true });
  };

  handleFunctions = ({ target }) => {
    this.checkQuestion({ target });
    this.toggleStyle();
    this.handleClick();
  };

  nextQuestion = () => {
    const { curr } = this.state;
    const { history } = this.props;
    const FOUR = 4;
    if (curr < FOUR) {
      this.setState({
        curr: curr + 1,
        answered: false,
        counter: 30,
        isDisabled: true,
      }, () => { this.newAnswers(); });
      this.toggleStyle();
      this.setTime();
    } else {
      this.savePlayersInLocalStorage();
      history.push('/feedback');
    }
  };

  savePlayersInLocalStorage = () => {
    const { name, assertions, src, score, index } = this.props;
    const objectPlayer = { index, name, src, assertions, score };
    let listOfPlayers = [];
    if (localStorage.getItem('players')) {
      listOfPlayers = JSON.parse(localStorage.getItem('players'));
      listOfPlayers.push(objectPlayer);
      localStorage.setItem('players', JSON.stringify(listOfPlayers));
      return;
    }
    listOfPlayers.push(objectPlayer);
    localStorage.setItem('players', JSON.stringify(listOfPlayers));
  };

  setTime = () => {
    const MAXTIME = 5000;
    const TIMER = 30000;
    setTimeout(() => { this.btnEnable(); }, MAXTIME);
    setTimeout(() => { this.btnDisable(); }, TIMER);
  };

  btnEnable() {
    this.setState({ isDisabled: false });
  }

  btnDisable() {
    this.setState({ isDisabled: true });
  }

  stopwatch() {
    const SECOND = 1000;
    setInterval(() => {
      const { counter } = this.state;
      if (counter <= 0) {
        this.setState({ counter: 0 });
      } else { this.setState({ counter: counter - 1 }); }
    }, SECOND);
    this.setTime();
  }

  render() {
    const { questions, mixAnswers, curr, counter, isDisabled, answered } = this.state;
    const { question, category, correct_answer: correct } = questions[curr];
    return (
      <section className="game-container">
        <Header />
        <div className="game-info-container">
          <div className="game-timer-question-container">
            <div data-testid="timer" className="timer-container">
              <p>Timer: </p>
              <p>{counter}</p>
            </div>
            <div className="question-container">
              <p data-testid="question-category">
                { category }
              </p>
              <p data-testid="question-text">
                { question }
              </p>
            </div>
          </div>
          <div data-testid="answer-options" className="answer-container">
            { mixAnswers.map((response, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ response === correct
                  ? 'correct-answer' : `wrong-answer-${index}` }
                disabled={ isDisabled }
                value={ response }
                onClick={ this.handleFunctions }
                className={ response === correct ? 'correctAnswer' : 'wrongAnswer' }
              >
                { response }
              </button>
            )) }
            {
              answered
            && (
              <button
                type="button"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            )
            }
          </div>
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  src: state.player.src,
  name: state.loginReducer.name,
  index: state.player.index,
  category: state.player.category,
  difficulty: state.player.difficulty,
});

export default connect(mapStateToProps)(Game);
