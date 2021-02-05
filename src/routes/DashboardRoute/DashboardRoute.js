import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import WordsService from '../../services/words-service';

class DashboardRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    error: null,
    language: '',
    score: 0,
    wordsPractice: '',
  };

  componentDidMount() {
    WordsService.getWords().then((data) => {
      this.setState({
        language: data.language.name,
        score: data.language.total_score,
      });
      this.renderWords(data.words);
    });
  }
  renderWords = (words) => {
    let wordsPractice = words.map((word) => {
      return (
        <li key={word.id}>
          <h4>{word.original}</h4>
          <p>Correct Answers: {word.correct_count}</p>
          <p> Incorrect Answers : {word.incorrect_count}</p>
          <hr />
        </li>
      );
    });
    this.setState({
      wordsPractice,
    });
  };

  render() {
    const { error, language, score, wordsPractice } = this.state;
    return (
      <section>
        <h2>Your {language} Words</h2>
        <Link to="/learn">
          <Button>Let's Learn!</Button>
        </Link>
        <p>Total correct answers: {score}</p>
        <div role="alert" className="alert">
          {error && <p>{error}</p>}
        </div>
        <hr />
        <div>{wordsPractice}</div>
      </section>
    );
  }
}

export default DashboardRoute;
