import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor (
    private httpClient: HttpClient
  ) { }

  updateUnit(location) {
    console.log('updating unit to:' + location);
  }
}
