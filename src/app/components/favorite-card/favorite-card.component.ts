import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
@Input() data;
  constructor() { }

  ngOnInit(): void {
  }

}
