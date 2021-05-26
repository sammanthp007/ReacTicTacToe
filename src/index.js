import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      squareVals: Array(9).fill(null),
      isXTurnNext: true
    }
  }

  handleClick(i) {
    const squareVals = this.state.squareVals.slice();
    const winner = calculateWinner(this.state.squareVals)
    // Don't do anything is a winner is already set
    if (winner) {
      return
    }

    // Don't do anything if there is already a value in the square
    if (squareVals[i]) {
      return
    }

    squareVals[i] = this.state.isXTurnNext ? "X" : "O";
    this.setState({ 
      squareVals: squareVals,
      isXTurnNext: !this.state.isXTurnNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squareVals[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // Display the winner or next turn accordingly
    const winner = calculateWinner(this.state.squareVals)
    let status
    if (winner) {
      status = "Winner is " + (winner)
    } else {
      status = 'Next player: ' + (this.state.isXTurnNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}