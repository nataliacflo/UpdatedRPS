import { Component, OnInit } from '@angular/core';
import { GameService } from '../control/game.service';
import { ResultService } from '../model/result.service';

interface IPlayer {
  hashtag: number;
  user: string;
  userScore: number;
  computer: string;
  computerScore: number;
  winner: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  playerArray: Array<IPlayer> = [];
  gameResult: Array<number> = [];
  disableAddButton = false;
  constructor(private game: GameService, private result: ResultService) { }

  ngOnInit() {
    const gameData = JSON.parse(localStorage.getItem('players'));
    console.log('gameData...', gameData);
    if (gameData && gameData.length > 0) {
      this.playerArray = gameData;
    }

  }

  onClick(choice: string) {
    this.gameResult = this.game.Play(choice);
    console.log('from onClick..... this.gameResult', this.gameResult);
    let roundWinner;
    switch (true) {
      case this.gameResult[0] > this.gameResult[1]:
        roundWinner = 'User';
        break;
      case this.gameResult[0] < this.gameResult[1]:
        roundWinner = 'Computer';
        break;
      default:
        roundWinner = 'Draw';
        break;
    }
    this.playerArray.unshift({
      hashtag: 1,
      user: 'User',
      userScore: this.gameResult[0],
      computer: 'Computer',
      computerScore: this.gameResult[1],
      winner: roundWinner
    });
    this.rank(this.playerArray);
    this.savetoLocalStorage();
  }

  addPlayer() {
    // this.playerArray.unshift({
    //     hashtag: null,
    //     firstName: null,
    //     lastName: null,
    //     score: null,
    //     editMode: true
    // });
    // this.disableAddButton = true;
    // this.savetoLocalStorage();
  }

  removePlayer(index: number) {
    this.playerArray.splice(index, 1);
    this.rank(this.playerArray);
    this.savetoLocalStorage();
  }

  savePlayer() {
    // this.playerArray[0].editMode = false;
    // this.disableAddButton = false;
    // this.sort('asc');
    // this.savetoLocalStorage();
  }

  sort(direction: string) {
    this.playerArray.sort((a: IPlayer, b: IPlayer) => {
      return a.hashtag < b.hashtag ? -1 : 1;
    });
  }

  savetoLocalStorage() {
    localStorage.setItem('players', JSON.stringify(this.playerArray));
  }

  rank(items: Array<any>) {
    const output = items.sort((prev, pres) => {
      return prev.userScore > prev.userScore ? -1 : 1;
    }).map((item, i, arr) => {
      item.hashtag = i + 1;
    });
    console.log('output', output);
  }
}
