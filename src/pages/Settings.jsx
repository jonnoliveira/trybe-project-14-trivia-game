/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { changeCategory, changeDifficulty } from '../redux/actions';
import settings from '../images/settings.svg';
import home from '../images/home.svg';

import '../css/Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.categoryApi = this.categoryApi.bind(this);
    this.handleCatDif = this.handleCatDif.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.categoryApi();
    dispatch(changeCategory('any'));
    dispatch(changeDifficulty('any'));
  }

  handleCatDif({ target }) {
    const { dispatch } = this.props;
    const { name, value } = target;
    if (name === 'category') {
      dispatch(changeCategory(value));
    } else {
      dispatch(changeDifficulty(value));
    }
  }

  async categoryApi() {
    const url = 'https://opentdb.com/api_category.php';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      categories: data.trivia_categories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <section className="settings-container">
        <div className="settings-info-container">
          <form action="" className="settings-info">
            <div className="settings-heading">
              <h2 data-testid="settings-title">
                Settings
              </h2>
              <img src={ settings } alt="Settings icon" />
            </div>

            <label htmlFor="categories-question">
              Categories:
              <select
                id="categories-question"
                name="category"
                onChange={ this.handleCatDif }
              >
                <option
                  value="any"
                >
                  Any Category
                </option>
                {categories.map((item) => {
                  const { id, name } = item;
                  return (
                    <option
                      key={ `${id}${name}` }
                      value={ id }
                    >
                      { name }
                    </option>
                  );
                })}
              </select>
            </label>

            <label htmlFor="difficulty-question">
              Difficulty:
              <select
                id="difficulty-question"
                name="difficulty"
                onChange={ this.handleCatDif }
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <div className="settings-home">
              <img src={ home } alt="Home icon" />
              <Link to="/">Página Inicial</Link>
            </div>

          </form>
        </div>
      </section>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Settings);
