import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolsPageComponent } from './tools-page/tools-page.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path: '', redirectTo: 'tools', pathMatch: 'full'},
  { path: 'tools', component: ToolsPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToolbarComponent,
    ToolsPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
