import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
@Input() weather;
@Input()isFavorite;
@Output() onSave: EventEmitter<any> = new EventEmitter();
@Output() onRemove: EventEmitter<any> = new EventEmitter();
  constructor() { }
  weatherIcon: string = '';
  isSaved: boolean = false;

  ngOnInit(): void {
    this.weatherIcon = `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
  }

  saveLocation(): void {
    this.isSaved = true;
    this.onSave.emit(this.isSaved);

  }

  removeLocation(): void {
    this.isSaved = false;
    this.onRemove.emit(this.isSaved);

  }
}
