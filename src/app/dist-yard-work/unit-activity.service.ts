import { Injectable } from '@angular/core';
import { UnitActivity } from './unit-activity.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitActivityService {

  unitActivity: UnitActivity;

  constructor (private httpClient: HttpClient) { }

  putUnitActivity(unitActivity) {
    return this.httpClient.put<UnitActivity>(environment.baseURL + 'unitActivity/', unitActivity);
  }
}
