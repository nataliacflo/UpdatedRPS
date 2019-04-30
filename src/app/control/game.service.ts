import { Injectable } from '@angular/core';
import {ResultService} from '../model/result.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  messageOut: string;
  compChoice: string;
  userChoice: string;
  // '1' - Paper , '2' - Rock , '3' - Scissors
  rockPaperScissors = ['r' , 'p' , 's'];

  constructor(private gameResult: ResultService) { }

  win() {
    this.removeStylingClass();
    console.log('Win');
    this.messageOut = 'You WON!';
    this.gameResult.addUserPoint();
    document.getElementById(this.userChoice).classList.add('green-glow');
  }

  lose() {
    this.removeStylingClass();
    console.log('Lose');
    this.messageOut = 'You LOSE!';
    this.gameResult.addCompPoint();
    document.getElementById(this.userChoice).classList.add('red-glow');
  }

  draw() {
    this.removeStylingClass();
    console.log('Draw');
    this.messageOut = 'DRAW!';
    document.getElementById(this.userChoice).classList.add('gray-glow');
  }

  removeStylingClass() {
    document.getElementById('r').classList.remove('green-glow', 'red-glow', 'gray-glow');
    document.getElementById('p').classList.remove('green-glow', 'red-glow', 'gray-glow');
    document.getElementById('s').classList.remove('green-glow', 'red-glow', 'gray-glow');
  }

  Play(uChoice: string) {
    this.userChoice = uChoice;
    this.compChoice = this.rockPaperScissors[Math.floor(Math.random() * this.rockPaperScissors.length)];
    // console.log(this.compChoice);

    switch (uChoice + this.compChoice) {
      // For Paper:
      case 'pp': {
        this.draw();
        break;
      }
      case 'pr': {
        this.win();
        break;
      }
      case 'ps': {
        this.lose();
        break;
      }
      // For Rock:
      case 'rr': {
        this.draw();
        break;
      }
      case 'rp': {
        this.lose();
        break;
      }
      case 'rs': {
        this.win();
        break;
      }
      // For Scissors:
      case 'sr': {
        this.lose();
        break;
      }
      case 'sp': {
        this.win();
        break;
      }
      case 'ss': {
        this.draw();
        break;
      }
    }
    console.log(this.gameResult.getResult());
  }
}
