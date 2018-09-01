import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  @Output() scanningUnitEnd = new EventEmitter<void>();

  isAuth: boolean;
  authSubscription: Subscription;
  user: User;

  constructor (
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onYard() {
    this.onClose();
    this.scanningUnitEnd.emit();
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
