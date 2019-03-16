import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
  constructor(props) {
    super(props);
    Board.instance = this;
    this.state = {
      winner: []
    }
  }

  renderSquare(i, winner = false) {
    let square = (
      <Square
        value={this.props.squares[i]}
        className={!winner ? 'square' : 'square square-winner'}
        onClick={() => this.props.onClick(i)}
      />
    );
    if(!this.squares) this.squares = [square];
    else this.squares.push(square);

    return square;
  }

  static calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i in lines) {
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          lines: lines[i]
        };
      }
    }
    return null;
  }

  setWinner(lines) {
    this.setState({ winner: lines });
  }

  static instance = null;

  render() {
    let rows = [];
    let base = 0;
    let winners = [];
    if(this.props.winners !== '') {
      winners = this.props.winners.split(',');
    }

    for(let i = 0; i < 3; i++) {
      let cols = [];
      for(let j = 0; j < 3; j++) {
        if(winners.length > 0) {
          console.log(`${winners[0]} === ${base}`);
          if(Number(winners[0]) === base) {
            winners.shift();
            cols.push(this.renderSquare(base, true));
          } else {
            cols.push(this.renderSquare(base));
          }
        } else {
          cols.push(this.renderSquare(base));
        }
        base += 1;
      }
      rows.push((
        <div className="board-row">
          {cols[0]}
          {cols[1]}
          {cols[2]}
        </div>
      ));
    }
    return (
      <div>
        {rows[0]}
        {rows[1]}
        {rows[2]}
      </div>
    );
  }
}