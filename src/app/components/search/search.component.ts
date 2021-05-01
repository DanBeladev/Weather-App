import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { catchError, debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { ErrorsService } from 'src/app/services/error.service';
import { SearchService } from 'src/app/services/search.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchTerms = new Subject<string>();

  constructor(public weatherService: WeatherService, private searchService: SearchService,
    private errorService: ErrorsService) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(this.searchLocation)
  }

  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  searchLocation = (term): void => {
    if(term){
    this.weatherService.getLocationWeather(term)
    .subscribe(
      res => this.searchService.searchResult.next(res),
      err => {
        this.searchTerms.next('')
        catchError(this.errorService.handleError(err.error.message || '', {} as any))});
    }
  }
}
