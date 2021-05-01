import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  favorites: any =[];
  constructor() { }


  saveLocation(locationCode: string): void {
    debugger;
    if(!this.isInFavorites(locationCode)){
      const newFav = [...this.getList(), locationCode];
      this.saveList(newFav);
    }
  }

  getFavorites(): any[] {
    const cachedDate = this.getList();
    return cachedDate;
  }

  isInFavorites(location_name: string): boolean {
    const items = JSON.parse(localStorage.getItem('fav'));
    return items && items.includes(location_name)
  }

  removeLocation(location_name: string): void {
    const locations = this.getList();
    const res = locations.filter(location => location !== location_name);
    this.saveList(res);
  }

  private getList(): any[] {
    return JSON.parse(localStorage.getItem('fav')) || []
  }

  private saveList(list): void {
    localStorage.setItem('fav', JSON.stringify(list));
  }
}
