import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const ERROR_DATA = 3;
const DELTA = 0.5;

export default class Game extends Component {
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
    // show: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    this.fetchQuestionsAPI(token);
  }

  fetchQuestionsAPI = async (token) => {
    const { history } = this.props;

    const QUESTIONS_API = `https://opentdb.com/api.php?amount=5&token=${token}`;

    const response = await fetch(QUESTIONS_API);
    const data = await response.json();
    const successful = data.results;

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

  render() {
    const { questions, mixAnswers, curr } = this.state;
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
              >
                { response }
              </button>
            )) }
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
