import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FormComponent } from './components/slides/form/form.component';
import { SliderComponent } from './components/slides/slider/slider.component';
import { PlanningComponent } from './components/planning/planning.component';


import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { VoiceCaptureComponent } from './components/voice-capture/voice-capture.component';
import { VoiceCaptureService } from './services/voice-capture.service';
import { CarouselComponent } from './components/slides/form/carousel/carousel.component';
import {ReactiveFormsModule} from "@angular/forms";

import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EditService} from './components/planning/edit.service';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'voice-capture', component: VoiceCaptureComponent },
  { path: 'form', component: FormComponent },
  { path: 'slider', component: SliderComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FormComponent,
    SliderComponent,
    HeaderComponent,
    PlanningComponent,
    VoiceCaptureComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SchedulerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    VoiceCaptureService,
    EditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
