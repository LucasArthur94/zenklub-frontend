import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfessionalComponent } from './professional/professional.component';

const routes: Routes = [
  {
    path: 'professional/:id',
    component: ProfessionalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
