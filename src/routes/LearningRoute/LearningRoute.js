import React, { Component } from 'react';
import WordsService from '../../services/words-service';
import Button from '../../components/Button/Button';
import { Input, Label } from './../../components/Form/Form';

class LearningRoute extends Component {
  state = {
    error: null,
    showResults: false,
    correctCount: 0,
    incorrectCount: 0,
    next: '',
    score: 0,
    isCorrect: false,
    original: '',
    translation: '',
    guess: '',
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  componentDidMount() {
    this.getFirst();
  }

  getFirst = () => {
    WordsService.getNext().then((data) => {
      this.setState({
        next: data.next,
        original: data.next,
        score: data.totalScore,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        showResults: false,
      });
    });
  };

  getNext = () => {
    WordsService.getNext().then((data) => {
      this.setState({
        original: data.next,
        incorrectCount: data.wordIncorrectCount,
        correctCount: data.wordCorrectCount,
        showResults: false,
      });
    });
  };

  handleGuess = (e) => {
    e.preventDefault();
    let guess = e.target['learn-guess-input'].value;
    this.setState({
      guess,
    });
    WordsService.getResult(guess).then((data) => {
      this.setState({
        next: data.next,
        score: data.totalScore,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        isCorrect: data.isCorrect,
        showResults: true,
        translation: data.answer,
      });
    });
  };

  handleNext = (e) => {
    e.preventDefault();
    this.setState({
      showResults: false,
    });
    this.getNext();
  };

  renderNext = () => {
    const { next, incorrectCount, correctCount, score } = this.state;
    return (
      <section>
        <h2>What does this word mean in English:</h2>

        <span>{next}</span>
        <form onSubmit={this.handleGuess}>
          <Label htmlFor="learn-guess-input">Your guess:</Label>
          <Input
            type="text"
            name="learn-guess-input"
            id="learn-guess-input"
            required
          ></Input>
          <Button type="submit">Answer</Button>
        </form>
        <p>
          <b>Total score is: {score}</b>
        </p>
        <div className="guess-group">
          <p>Correct guesses: {correctCount}</p>
          <p>Incorrect guesses: {incorrectCount}</p>
        </div>
      </section>
    );
  };

  renderResults = () => {
    let { isCorrect, guess, original, translation, score } = this.state;
    return (
      <section>
        {isCorrect ? (
          <h2>You were correct! </h2>
        ) : (
          <h2>Wrong answer, try again...</h2>
        )}
        <p>
          The correct translation for <b>{original} </b> was{' '}
          <b>{translation}</b> and your answer was: <b>{guess}</b>.
        </p>
        <p>Your total score is: {score}</p>
        <Button onClick={this.handleNext}>More Words</Button>
      </section>
    );
  };

  render() {
    let { showResults } = this.state;
    return (
      <section>
        {showResults ? this.renderResults() : this.renderNext()}
      </section>
    );
  }
}

export default LearningRoute;
