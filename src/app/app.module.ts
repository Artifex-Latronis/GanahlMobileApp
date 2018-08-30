import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { UnitComponent } from './unit-actions/unit/unit.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { UnitService } from './unit-actions/unit.service';
import { UnitActivityService } from './unit-actions/unit-activity.service';
import { AuthService } from './auth/auth.service';
import { UiService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { UnitPullComponent } from './unit-actions/unit-pull/unit-pull.component';
import { UnitMoveComponent } from './unit-actions/unit-move/unit-move.component';
import { UnitActionsComponent } from './unit-actions/unit-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    UnitComponent,
    ConfirmDialogComponent,
    UnitPullComponent,
    UnitMoveComponent,
    UnitActionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot({ ui: appReducer }),
    AppRoutingModule
  ],
  providers: [AuthService, UiService, UnitService, UnitActivityService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
