import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    private store: Store<{ ui: fromApp.State }>
  ) { }

  login() {
    this.store.dispatch({ type: 'START_LOADING' });
  }
}
