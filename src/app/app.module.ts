import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

import { DashboardService } from './services/dashboard.service'

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        CadastroComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot()
    ],
    providers: [
        DashboardService
    ],
    bootstrap: [
        AppComponent,
        NavbarComponent
    ]
})
export class AppModule { }
