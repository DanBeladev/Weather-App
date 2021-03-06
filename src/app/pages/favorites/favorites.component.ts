import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { ErrorsService } from 'src/app/services/error.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoritesKeys: any[] = [];
  favorites: any[] = []
  interval: any;
  constructor(private cache: CacheService,
     private weatherService: WeatherService,
     private spinner: SpinnerService,
     private errorService: ErrorsService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchData();
    if(this.favorites.length === 0){
      this.toastr.info("Save here the places you liked ", "Start adding favorite places from the home page :)")
    }

    this.interval = setInterval(()=>{
      this.fetchData()
    },15000)
  }

  fetchData(): void {
    this.getFavorites();
    this.getFavoritesData();
  }

  getFavorites(): void {
    this.favoritesKeys = this.cache.getFavorites();
  }

  getFavoritesData(): void {
    const data = [];
    this.favoritesKeys.forEach(key => {
      this.spinner.requestStarted();
      this.weatherService.getLocationWeather(key).subscribe( res=> {
        this.spinner.requestEnded();
        data.push(res);
        this.favorites = [...data];
      },
      (err) => catchError(this.errorService.handleError(err.error.message, {} as any))
      )
    })
  }

  ngOnDestroy(): void {
    if(this.interval){
      clearInterval(this.interval);
    }
  }

}
