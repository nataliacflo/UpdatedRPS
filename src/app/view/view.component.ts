import { Component, OnInit } from '@angular/core';
import { GameService } from '../control/game.service';
import {ResultService} from '../model/result.service';

interface IPlayer {
  hashtag: number;
  firstName: string;
  lastName: string;
  score: string;
  editMode: boolean;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  playerArray: Array<IPlayer> = [];
  disableAddButton = false;
  constructor(private game: GameService,
              private result: ResultService) { }

  ngOnInit() {
    this.playerArray = [
      {
        hashtag: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        score: '5',
        editMode: false
      },
      {
        hashtag: 2,
        firstName: 'Mike',
        lastName: 'Tyson',
        score: '4',
        editMode: false
      },
      {
        hashtag: 3,
        firstName: 'Paulo',
        lastName: 'Carmelo',
        score: '3',
        editMode: false
      }
    ];
  }

  onClick(choice: string) {
    this.game.Play(choice);
  }

  addPlayer() {
    this.playerArray.unshift({
        hashtag: null,
        firstName: null,
        lastName: null,
        score: null,
        editMode: true
    });
    this.disableAddButton = true;
  }

  removePlayer(index: number) {
    this.playerArray.splice(index, 1);
  }

  savePlayer() {
    this.playerArray[0].editMode = false;
    this.disableAddButton = false;

    this.sort('asc');
  }

  sort(direction: string) {
    this.playerArray.sort((a: IPlayer, b: IPlayer) => {
      return a.hashtag < b.hashtag ? -1 : 1;
    });
  }
}
