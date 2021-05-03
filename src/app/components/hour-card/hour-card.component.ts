import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hour-card',
  templateUrl: './hour-card.component.html',
  styleUrls: ['./hour-card.component.scss']
})
export class HourCardComponent implements OnInit {
@Input() hourData
hour: string;
temperature: number
  constructor() { }

  weatherIcon: string = '';

  ngOnInit(): void {
    this.weatherIcon = `http://openweathermap.org/img/w/${this.hourData.weather[0].icon}.png`;
    const fullHour = this.hourData.dt_txt.split(' ')[1];
    this.hour = `${fullHour.split(':')[0]}:${fullHour.split(':')[1]}`
    this.temperature = Math.round(this.hourData.main.temp);
  }

}
