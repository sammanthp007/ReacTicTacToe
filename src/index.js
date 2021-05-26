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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squareVals[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      boards: [{
        squareVals: Array(9).fill(null)
      }],
      isXTurnNext: true,
      viewingStep: 0
    }
  }

  jumpTo(move) {
    this.setState(
      {
        squareVals: this.state.squareVals,
        isXTurnNext: (move % 2) === 0,
        viewingStep: move
      }
    )
  }

  render() {
    const boards = this.state.boards;
    const currentBoard = boards[this.state.viewingStep];
    // Display the winner or next turn accordingly
    const winner = calculateWinner(currentBoard.squareVals)

    const moves = boards.map((step, move) => {
      const desc = move ?
        "Go to move #" + move :
        "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });
    let status
    if (winner) {
      status = "Winner is " + (winner)
    } else {
      status = 'Next player: ' + (this.props.isXTurnNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squareVals={currentBoard.squareVals}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const boards = this.state.boards.slice(0, this.state.viewingStep + 1);
    const currentBoard = boards[boards.length - 1];
    const squareVals = currentBoard.squareVals.slice();
    const winner = calculateWinner(squareVals)
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
      boards: boards.concat([{
        squareVals: squareVals
      }]),
      isXTurnNext: !this.state.isXTurnNext,
      viewingStep: boards.length
    });
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