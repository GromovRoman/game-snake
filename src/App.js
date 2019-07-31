import React, { Component } from 'react';
import Table from './components/table';
import './App.css';

const Context = React.createContext({});

class App extends Component {
  constructor() {
    super();

    this.state = {
      field: {
        column: 9,
        cell: 9
      },
      snake: [
          [1, 0],
          [0, 0]
      ],
      fruit: [],
    }
  }

  isSuicide(nextStep) {
    let snake = this.state.snake;

    for(let i = 1; i < snake.length; i++) {
      if(nextStep === snake[i][0]) {
        if(nextStep === snake[i][1]) {
            return true;
        }
      }
    }

    return false;
  }

  isWall(nextStep) {
    if(nextStep > this.state.field.column || nextStep < 0) {
      return true; 
    }
    if(nextStep > this.state.field.cell || nextStep < 0) {
      return true; 
    }
    return false;
  }

  tick = (direction) => {
    let snakeClone = [...this.state.snake],
        die = false,
        nextStep;

    switch(direction) {
      case 'left': 
        nextStep = [snakeClone[0][0] - 1, snakeClone[0][1]];
        if(this.isWall(snakeClone[0][0] - 1) || this.isSuicide(snakeClone[0][0] - 1)){
          die = true;
        }else {
          snakeClone.unshift(nextStep);
          if(this.isSnakeEats()) {
            this.addFruit();
          }else { 
            snakeClone.pop();
          }
        }
        break;
      case 'up':
        nextStep = [snakeClone[0][0], snakeClone[0][1] - 1];
        if(this.isWall(snakeClone[0][1] - 1) || this.isSuicide(snakeClone[0][1] - 1)){
          die = true;
        }else {
          snakeClone.unshift(nextStep);
          if(this.isSnakeEats()) {
            this.addFruit();
          }else { 
            snakeClone.pop();
          }
        }
        break;
      case 'right':
        nextStep = [snakeClone[0][0] + 1, snakeClone[0][1]];
        if(this.isWall(snakeClone[0][0] + 1) || this.isSuicide(snakeClone[0][0] + 1)){
          die = true;
        }else {
          snakeClone.unshift(nextStep);
          if(this.isSnakeEats()) {
            this.addFruit();
          }else { 
            snakeClone.pop();
          }
        }
        break;
      case 'down': 
        nextStep = [snakeClone[0][0], snakeClone[0][1] + 1];
        if(this.isWall(snakeClone[0][1] + 1) || this.isSuicide(snakeClone[0][1] + 1)){
          die = true;
        }else {
          snakeClone.unshift(nextStep);
          if(this.isSnakeEats()) {
            this.addFruit();
          }else { 
            snakeClone.pop();
          }
        }
        break;
      default: break;
    }

    const snake = die ? [[1, 0], [0, 0]] : snakeClone;
    if(die) {
      this.directionOfMovement = 'right';
    }
    this.setState({snake});
  }

  randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  generateRandomColumn() {
    return this.randomInteger(0, this.state.field.column);
  }

  generateRandomCell() {
    return this.randomInteger(0, this.state.field.cell);
  }

  generateFruitPosition() {
    return [this.generateRandomColumn(), this.generateRandomCell()];
  } 

  addFruit() {
    let newFruit = this.generateFruitPosition();

    for(let i = 0; i < this.state.snake.length;) {
      if(this.state.snake[i][0] === newFruit[0] && this.state.snake[i][1] === newFruit[1]) {
        newFruit = this.generateFruitPosition();
        i = 0;
      }else {
        i++;
      }
    }

    this.setState({
      fruit: newFruit,
    });
  }

  isSnakeEats() {
    let snakeHeadPosition = this.state.snake[0],
        fruitPosition = this.state.fruit,
        isEat = false;

    if(snakeHeadPosition[0] === fruitPosition[0]) {
      if(snakeHeadPosition[1] === fruitPosition[1]) {
        isEat = true;
      }
    }

    return isEat;
  }
  componentDidMount() {
    this.directionOfMovement = 'right';

    this.timer = setInterval(() => this.tick(this.directionOfMovement), 250);

    this.addFruit();

    document.addEventListener('keyup', (event) => {

      switch(event.keyCode) {
        case 37:
          if(this.directionOfMovement !== 'right') {
            this.directionOfMovement = 'left';
          }
          break;
        case 38:
          if(this.directionOfMovement !== 'down') {
            this.directionOfMovement = 'up';
          }
          break;
        case 39:
          if(this.directionOfMovement !== 'left') {
            this.directionOfMovement = 'right';
          }
          break;
        case 40:
          if(this.directionOfMovement !== 'up') {
            this.directionOfMovement = 'down';
          }
          break;
        default: break;
      }
    });
  };

  render() {
    return (
      <Context.Provider 
        value={
          {
            field: this.state.field,
            snake: this.state.snake,
            fruit: this.state.fruit,
          }
        }
      >
        <Table/> 
      </Context.Provider>
    )
  }
}

export default App;
export {Context};