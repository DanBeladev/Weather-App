import { Component, OnInit, OnDestroy } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { ErrorsService } from 'src/app/services/error.service';
import { SearchService } from "src/app/services/search.service";
import { SpinnerService } from 'src/app/services/spinner.service';
import { WeatherService } from "src/app/services/weather.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentWeather: any;
  isCurrentWeatherInFavorites: boolean = false;
  hourlyWeatherData: any;
  interval: any;

  constructor(
    private weatherService: WeatherService,
    private search: SearchService,
    private cache: CacheService,
    private spinner: SpinnerService,
    private errorService: ErrorsService,
    private toaster: ToastrService
  ) {
    this.search.searchResult.subscribe((res) => {
      if (res) {
        this.isCurrentWeatherInFavorites = this.cache.isInFavorites(res.name);
        this.getHourlyWeather(res);
        this.currentWeather = res;
      }
    },
    (err) => catchError(this.errorService.handleError(err.error.message, {} as any))
    );
  }

  ngOnInit(): void {
    this.getCurrentWeather();

    this.interval = setInterval(()=>{
      this.refreshData();
    }, 10000);
  }

  refreshData(): void {
    const {lon, lat} = this.currentWeather.coord;
    this.spinner.requestStarted();
    this.weatherService
    .getMyWeather(lon, lat)
    .subscribe((weather) => {
      this.spinner.requestEnded();
      this.currentWeather = weather;
      this.isCurrentWeatherInFavorites = this.cache.isInFavorites(weather.name);
      this.getHourlyWeather(weather);
    },
    (err) => catchError(this.errorService.handleError(err.error.message, {} as any)));
  }

  getCurrentWeather(): void {
    if (!this.currentWeather) {
      this.spinner.requestStarted();
      navigator.geolocation.getCurrentPosition((p) => {
        const { coords } = p;
        const { longitude, latitude } = coords;
        this.weatherService
          .getMyWeather(longitude, latitude)
          .subscribe((weather) => {
            this.spinner.requestEnded();
            this.currentWeather = weather;
            this.isCurrentWeatherInFavorites = this.cache.isInFavorites(weather.name);
            this.getHourlyWeather(weather);
          },
          (err) => catchError(this.errorService.handleError(err.error.message, {} as any)));
      });
    }
  }

  getHourlyWeather(weather: any): void {
    this.spinner.requestStarted();
    this.weatherService
      .getHourlyWeather(weather.id)
      .subscribe((hourlyWeather) => {
        this.spinner.requestEnded();
        this.hourlyWeatherData = hourlyWeather.list;
      },
      (err) => catchError(this.errorService.handleError(err.error.message, {} as any)));
  }


  onSaveLocaion(): void {
    this.cache.saveLocation(this.currentWeather.name);
    this.isCurrentWeatherInFavorites = true;
    this.toaster.success(this.currentWeather.name, 'Added to favorites!');
  }

  onRemoveLocation(): void {
    this.cache.removeLocation(this.currentWeather.name);
    this.isCurrentWeatherInFavorites = false;
    this.toaster.info(this.currentWeather.name, 'Removed from favorites');
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
