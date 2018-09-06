import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  token: string;

  constructor (
    private router: Router,
    private store: Store<{ ui: fromApp.State }>
  ) { }



  login(authData: AuthData) {
    this.store.dispatch({ type: 'START_LOADING' });
    this.user = {
      userID: authData.userID,
      userName: 'Remington Richards'
    };
    // tslint:disable-next-line:max-line-length
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNjaGFyZmYiLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE1MzYyMjY5MTIsImV4cCI6MTUzNjI1NTY5OCwiaXNzIjoickJ4UGtkRXpCWTBraE50VmFoS2ZQdkFscmdQZm5BWDcifQ.5oujiZH2uJafp09MbJ6P08HcYNERcPufxbbVzug3bwQ';
    this.authChange.next(true);
    this.router.navigate(['/yard']);
  }

  getUser() {
    return { ... this.user };
  }

  isAuth() {
    return this.user != null;
  }

  getToken() {
    return this.token;
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
}
