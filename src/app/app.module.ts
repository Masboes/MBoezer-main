import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { P5SketchesPageComponent } from './p5-sketches-page/p5-sketches-page.component';
import {RouterModule, Routes} from "@angular/router";
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
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

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'p5-sketches', component: P5SketchesPageComponent},
  { path: 'p5-sketches/:sketch', component: P5SketchesPageComponent},
  { path: 'about', component: AboutPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToolbarComponent,
    P5SketchesPageComponent,
    HomePageComponent,
    AboutPageComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
