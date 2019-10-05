import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {YggComponent} from './yggtorrent/ygg.component';

const routes: Routes = [
  {path: '', redirectTo: 'ygg', pathMatch: 'full'},
  {path: 'ygg', component: YggComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
