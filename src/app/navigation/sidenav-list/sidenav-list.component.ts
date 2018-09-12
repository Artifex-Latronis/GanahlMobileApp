import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../auth/user.model';
import { UnitService } from '../../dist-yard-work/unit.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducers';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  @Output() scanningUnitEnd = new EventEmitter<void>();

  isAuth$: Observable<boolean>;
  isAuth: boolean;
  authSubscription: Subscription;
  user: User;

  constructor (
    private authService: AuthService,
    private unitService: UnitService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });

    this.isAuth$ = this.store.select(fromRoot.getIsAuth);

  }

  onYard() {
    this.onClose();
    this.unitService.stopAllUnitActions();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }


  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
