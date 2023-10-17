import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    PageConnectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
