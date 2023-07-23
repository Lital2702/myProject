// Function to generate random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to generate a random math equation
  function generateEquation() {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let operator = getRandomNumber(1, 2) === 1 ? '+' : '-';
    let equation = num1 + ' ' + operator + ' ' + num2 + ' ' + '=';
    let result = operator === '+' ? num1 + num2 : num1 - num2;
    return { equation: equation, result: result };
  }
  
  // Function to check the user's answer
  function checkAnswer() {
    let userAnswer = document.getElementById('answer').value;
    let equationResult = document.getElementById('question').dataset.result;
    let resultElement = document.getElementById('result');
  
    if (userAnswer === equationResult) {
      resultElement.textContent = 'תשובה נכונה!';
      resultElement.style.color = 'white';
    } else {
      resultElement.textContent = 'תשובה לא נכונה. נסה שוב';
      resultElement.style.color = 'red';
    }
  }
  
  // Function to start or restart the game
  function startGame() {
    // Generate the initial math equation
    let equationObj = generateEquation();
    document.getElementById('question').textContent = equationObj.equation;
    document.getElementById('question').dataset.result = equationObj.result;
  
    // Clear the answer input and result message
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
  }
  
  // Function to restart the game when restart button is clicked
  function restartGame() {
    startGame();
  }
  
  // Add event listeners to the check and restart buttons
  document.getElementById('checkButton').addEventListener('click', checkAnswer);
  document.getElementById('restartButton').addEventListener('click', restartGame);
  
  // Start the game initially
  startGame();
  