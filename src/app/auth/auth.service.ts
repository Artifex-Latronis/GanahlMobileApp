import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  user: User;

  constructor (
    private router: Router,
    private store: Store<{ ui: fromApp.State }>,
    private httpClient: HttpClient,
    private uiService: UiService
  ) { }



  login(authData: AuthData) {
    this.store.dispatch({ type: 'START_LOADING' });

    this.getUser(authData)
      .subscribe(
        (data: User) => {
          this.user = { ...data };
          console.log(this.user);
          this.authChange.next(true);
          this.router.navigate(['/yard']);
        },
        error => {
          this.uiService.showSnackbar(error, null, 3000);
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
