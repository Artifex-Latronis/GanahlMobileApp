import { Injectable } from '@angular/core';
import { UnitActivity } from './unit-activity.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitActivityService {

  unitActivity: UnitActivity;

  constructor (private httpClient: HttpClient) { }

  putUnitActivity(unitActivity) {
    return this.httpClient.put<UnitActivity>('https://myaccount.ganahl.com/api/dev/request/unitActivity/', unitActivity);
  }
}
