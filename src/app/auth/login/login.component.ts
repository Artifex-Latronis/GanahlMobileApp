import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  isLoading$: Observable<boolean>;

  constructor (
    private authService: AuthService,
    private store: Store<{ ui: fromApp.State }>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.loginForm = new FormGroup({
      userID: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      userID: this.loginForm.value.userID,
      password: this.loginForm.value.password
    });

    // console.log(this.loginForm.value.user);
    // console.log(this.loginForm.value.password);

  }

}
