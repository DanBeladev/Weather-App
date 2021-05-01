import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-hour-card',
  templateUrl: './hour-card.component.html',
  styleUrls: ['./hour-card.component.scss']
})
export class HourCardComponent implements OnInit {
@Input() hourData
hour: number;
minutes: number;
temperature: number
  constructor() { }

  weatherIcon: string = '';

  ngOnInit(): void {
    this.weatherIcon = `http://openweathermap.org/img/w/${this.hourData.weather[0].icon}.png`;
    this.hour = moment(this.hourData.dt).hour();
    // this.hour = this.hourData?.dt_text?.split(" ")[0];
    this.minutes = new Date(this.hourData.dt).getMinutes();
    this.temperature = Math.round(this.hourData.main.temp);
  }

}
