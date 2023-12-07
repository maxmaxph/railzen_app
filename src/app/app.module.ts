import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';
import { PageSubscribeComponent } from './pages/page-subscribe/page-subscribe.component';
import { PageSubmitSessionComponent } from './pages/page-submit-session/page-submit-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SessionCardComponent } from './components/session-card/session-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    PageConnectComponent,
    PageSubscribeComponent,
    PageSubmitSessionComponent,
    SessionCardComponent,
    CategoryCardComponent,
    CategoryListComponent,
    SessionListComponent,
    PageUserComponent,
    PageAdminComponent,
    AdminTableComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
