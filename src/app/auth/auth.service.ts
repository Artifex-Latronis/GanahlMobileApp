import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UiService } from '../shared/ui.service';
import { LoggingService } from '../shared/logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  user: User;

  constructor (
    private router: Router,
    private store: Store<fromRoot.State>,
    private httpClient: HttpClient,
    private uiService: UiService,
    private loggingService: LoggingService
  ) { }



  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());

    this.getUser(authData)
      .subscribe(
        (data: User) => {
          this.user = { ...data };
          if (this.loggingService.showHttpResponseObjectsInConsole()) {
            console.log(this.user);
          }
          this.authChange.next(true);
          this.router.navigate(['/yard']);
          this.store.dispatch(new UI.StopLoading());
        },
        error => {
          this.uiService.showSnackbar(error, null, 3000);
          this.store.dispatch(new UI.StopLoading());
        }
      );

  }

  getCurrentUser() {
    return { ... this.user };
  }

  getUser(user) {
    return this.httpClient.post<User>('https://myaccount.ganahl.com/api/dev/l/request/login', user);
  }

  isAuth() {
    return this.user != null;
  }

  getToken() {
    return this.user ? this.user.jwt : null;
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

}
