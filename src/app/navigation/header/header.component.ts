import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  user: User;

  constructor (
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    //   this.user = this.authService.getCurrentUser();
    // });

    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.user = this.authService.getCurrentUser();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}
