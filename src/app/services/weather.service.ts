import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { currentWeather } from 'src/mocks/currentWeather';
import { hourlyForecast } from 'src/mocks/hourlyForcast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getMyWeather(lon: number, lat: number): Observable<any> {
    const url = `${environment.BASE_API_URL}weather?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}&${environment.UNITS}`
    return this.http.get(url)
    // return of(currentWeather);
  }

  getHourlyWeather(cityId: any): Observable<any> {
    const url = `${environment.BASE_API_URL}forecast?id=${cityId}&appid=${environment.API_KEY}&${environment.UNITS}&cnt=10`
    return this.http.get(url)
    // return of(hourlyForecast);
  }

  getLocationWeather(location_name: string): Observable<any> {
    const url = `${environment.BASE_API_URL}weather?q=${location_name}&appid=${environment.API_KEY}&${environment.UNITS}`
    return this.http.get(url);
  }

  getWeatherById(id: number): Observable<any> {
    const url = `${environment.BASE_API_URL}weather?id=${id}&appid=${environment.API_KEY}&${environment.UNITS}`
    return this.http.get(url);
  }
}
