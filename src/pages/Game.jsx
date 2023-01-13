import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addScore } from '../redux/actions';

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
    // rightAnswer: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    this.fetchQuestionsAPI(token);
    this.stopwatch();
  }

  fetchQuestionsAPI = async (token) => {
    const { history } = this.props;

    const QUESTIONS_API = `https://opentdb.com/api.php?amount=5&token=${token}`;

    const response = await fetch(QUESTIONS_API);
    const data = await response.json();
    const successful = data.results;
    // console.log(successful);

    if (data.response_code === ERROR_DATA) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }

    // atualizar o array Mix respostas
    const { correct_answer: correct, incorrect_answers: incorrect,
    } = successful[0];

    const answers = [correct, ...incorrect];
    answers.sort(() => Math.random() - DELTA); // https://forum.freecodecamp.org/t/how-does-math-random-work-to-sort-an-array/151540/4

    this.setState({
      questions: successful,
      mixAnswers: answers,
    });
  };

  // objToGlobalState = () => {
  //   const { questions, curr } = this.state;
  //   const { dispatch } = this.props;
  //   const { correct_answer: correct, difficulty } = questions[curr];
  //   const obj = {
  //     correct,
  //     difficulty,
  //   };
  //   dispatch(addDiff(obj));
  // };

  handleFunctions = ({ target }) => {
    this.confereAnswer({ target });
    // this.toggleStyle();
    // this.handleClick();
  };

  confereAnswer = ({ target }) => {
    const { dispatch, score } = this.props;
    const { questions, curr, counter } = this.state;
    const { correct_answer: correct, difficulty } = questions[curr];
    const three = 3;
    const ten = 10;
    let scoreValue = 0;
    if (target.value === correct && difficulty === 'easy') {
      scoreValue = (ten + (1 * counter) + score);
      dispatch(addScore(scoreValue));
    }
    if (target.value === correct && difficulty === 'medium') {
      scoreValue = (ten + (2 * counter) + score);
      dispatch(addScore(scoreValue));
    }
    if (target.value === correct && difficulty === 'hard') {
      scoreValue = (ten + (three * counter) + score);
      dispatch(addScore(scoreValue));
    }
    // console.log(scoreValue);
  };

  btnEnable() {
    this.setState({ isDisabled: false });
  }

  btnDisable() {
    this.setState({ isDisabled: true });
  }

  stopwatch() {
    const second = 1000;
    const maxTime = 5000;
    const timer = 30000;
    setInterval(() => {
      const { counter } = this.state;
      if (counter <= 0) {
        this.setState({ counter: 0 });
      } else { this.setState({ counter: counter - 1 }); }
    }, second);
    setTimeout(() => {
      this.btnEnable();
    }, maxTime);
    setTimeout(() => {
      this.btnDisable();
    }, timer);
  }

  render() {
    const { questions, mixAnswers, curr, counter, isDisabled } = this.state;
    const { question, category, correct_answer: correct } = questions[curr];
    return (
      <div>
        <Header />
        <div>
          <h2 data-testid="question-text">
            { question }
          </h2>
          <h3 data-testid="question-category">
            { category }
          </h3>
          <div data-testid="answer-options">
            { mixAnswers.map((response, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ response === correct
                  ? 'correct-answer' : `wrong-answer-${index}` }
                disabled={ isDisabled }
                value={ response }
                onClick={ this.handleFunctions }
              >
                { response }
              </button>
            )) }
          </div>
          <h4>{counter}</h4>
        </div>
      </div>
    );
  }
}

Game.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
