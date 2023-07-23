class TicTacToe {
  constructor() {
    this.board = new Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
  }

  makeMove(position) {
    if (this.board[position] === '' && !this.gameOver) {
      this.board[position] = this.currentPlayer;
      document.getElementsByClassName('cell')[position].textContent = this.currentPlayer;
      if (this.checkWin()) {
        alert(`Player ${this.currentPlayer} wins!`);
        this.gameOver = true;
      } else if (this.board.every(cell => cell !== '')) {
        alert('It\'s a tie!');
        this.gameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWin() {
    for (let combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a] !== '' &&
        this.board[a] === this.board[b] &&
        this.board[b] === this.board[c]
      ) {
        return true;
      }
    }
    return false;
  }

  resetBoard() {
    this.board.fill('');
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
    }
    this.currentPlayer = 'X';
    this.gameOver = false;
  }
}

const game = new TicTacToe();

function makeMove(position) {
  game.makeMove(position);
}

function resetBoard() {
  game.resetBoard();
}

  

  
