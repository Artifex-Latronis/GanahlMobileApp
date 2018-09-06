import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { UnitService } from './dist-yard-work/unit.service';
import { UnitActivityService } from './dist-yard-work/unit-activity.service';
import { AuthService } from './auth/auth.service';
import { UiService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { DistYardWorkModule } from './dist-yard-work/dist-yard-work.module';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ ui: appReducer }),
    SharedModule,
    AppRoutingModule,
    AuthModule,
    DistYardWorkModule
  ],
  providers: [
    AuthService,
    UiService,
    UnitService,
    UnitActivityService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
