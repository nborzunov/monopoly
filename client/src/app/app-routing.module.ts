import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RulesComponent } from './pages/rules/rules.component'

const routes: Routes = [
  {
    path: 'rules',
    component: RulesComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
