import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';
import { PageSubscribeComponent } from './pages/page-subscribe/page-subscribe.component';
import { PageSubmitSessionComponent } from './pages/page-submit-session/page-submit-session.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SessionCardComponent } from './components/session-card/session-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { userGuard } from './guards/user.guard';
import { adminGuard } from './guards/admin.guard';
import { PageInfosComponent } from './pages/page-infos/page-infos.component';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  {
    path: 'infos',
    component: PageInfosComponent,
  },
  { path: 'connect', component: PageConnectComponent },
  { path: 'subscribe', component: PageSubscribeComponent },
  {
    path: 'submit',
    component: PageSubmitSessionComponent,
    canActivate: [adminGuard],
  },
  { path: 'card', component: CategoryCardComponent },
  { path: 'session-card', component: SessionCardComponent },
  {
    path: 'sessions/:categoryId',
    component: SessionListComponent,
    canActivate: [userGuard],
  },
  {
    path: 'sessions/details/:sessionId',
    component: SessionCardComponent,
    canActivate: [userGuard],
  },
  {
    path: 'admin',
    component: PageAdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'category',
    component: CategoryListComponent,
    canActivate: [userGuard],
  },
  {
    path: 'user',
    component: PageUserComponent,
    canActivate: [userGuard],
  },
  {
    path: 'infos',
    component: PageInfosComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule {}
