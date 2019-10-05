import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {YggComponent} from './yggtorrent/ygg.component';
import {MatTableModule} from '@angular/material/table';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {LoaderComponent} from './loader/loader.component';
import {LoaderInterceptor} from './interceptor/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    YggComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
