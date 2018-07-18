import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatDialogModule,
  MatButtonModule,
  MatExpansionModule,
  MatListModule,
  MatSidenavModule,
  MatRadioModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatIconModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatSlideToggleModule,
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {NgPipesModule} from "ngx-pipes";
import {MdlDirective} from "../directives/mdl-directive";
import {FormFactory} from "../models/form/form-factory";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "../components/home-page/home-page.component";
import {P5SketchesPageComponent} from "../components/p5-sketches-page/p5-sketches-page.component";
import {AboutPageComponent} from "../components/about-page/about-page.component";
import {SidebarComponent} from "../components/sidebar/sidebar.component";
import {ToolbarComponent} from "../components/toolbar/toolbar.component";
import {FormComponent} from "../components/form/form.component";
import {ToolsPageComponent} from "../components/tools-page/tools-page.component";
import {RequestMakerComponent} from "../components/tools-page/tools/request-maker/request-maker.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'p5-sketches', component: P5SketchesPageComponent},
  { path: 'p5-sketches/:sketch', component: P5SketchesPageComponent},
  { path: 'about', component: AboutPageComponent},
  { path: 'tools', component: ToolsPageComponent},
  { path: 'tools/request-maker', component: RequestMakerComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToolbarComponent,
    P5SketchesPageComponent,
    ToolsPageComponent,
    RequestMakerComponent,
    HomePageComponent,
    AboutPageComponent,
    FormComponent,
    MdlDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    NgPipesModule,
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [FormFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
