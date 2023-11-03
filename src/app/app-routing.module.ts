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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: 'connect', component: PageConnectComponent },
  { path: 'subscribe', component: PageSubscribeComponent },
  { path: 'submit', component: PageSubmitSessionComponent },
  { path: 'card', component: CategoryCardComponent },
  { path: 'category', component: CategoryListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
