import { Injectable } from '@angular/core';
import { UnitActivity } from './unit-activity.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitActivityService {

  unitActivity: UnitActivity;

  constructor (private httpClient: HttpClient) { }

  putUnitActivity(unitActivity: UnitActivity): Observable<UnitActivity> {
    return this.httpClient.put<UnitActivity>('https://myaccount.ganahl.com/api/dev/request/unitActivity/', unitActivity);
  }
}
