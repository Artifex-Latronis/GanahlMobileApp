import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor (
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      user: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    console.log(this.loginForm.value.user);
    console.log(this.loginForm.value.password);
  }

}
