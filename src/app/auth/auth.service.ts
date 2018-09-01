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
    this.authChange.next(true);
    this.router.navigate(['/yard']);
  }

  getUser() {
    return { ... this.user };
  }

  isAuth() {
    return this.user != null;
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
}
