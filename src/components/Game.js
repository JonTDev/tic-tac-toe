import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
          squares: Array(9).fill(null)
        }],
      stepNumber: 0,
      listSteps: false,
      xIsNext: true
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  getLocation(i) {
    return [
      'A:1','B:1','C:1',
      'A:2','B:2','C:2',
      'A:3','B:3','C:3'
    ][i];
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(Board.calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: this.getLocation(i)
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  toggleStepListOrder() {
    this.setState({
      listSteps: !this.state.listSteps
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = Board.calculateWinner(current.squares);
    const toggle = this.state.listSteps;

    let moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move} - Last Move: ${step.location}` : 'Go to Game Start';
      if(move === this.state.stepNumber) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              <strong>{desc}</strong>
            </button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });
    if(this.state.listSteps) {
      let start = moves.shift();
      moves = moves.reverse();
      moves.unshift(start);
    }
    let status = '';
    console.log();
    if(winner !== null) {
      status = `Winner: ${winner.winner}`;
    } else if(current.squares.filter(i => i === null).length === 0) {
      status = 'Draw:  No one wins';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winners={!winner ? '' : winner.lines.join(',')}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleStepListOrder()}>
            Change To:  {!toggle ? 'Descending' : 'Ascending'}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
