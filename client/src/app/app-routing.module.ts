import { NgModule } from "@angular/core"
import { Routes } from "@angular/router"
import { RouterModule } from "@angular/router"
import { SearchPageComponent } from "./search/components/search-page/search-page.component"

const routes: Routes = [
	{
		path: "search",
		component: SearchPageComponent,
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
