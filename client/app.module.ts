import './polyfills';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import { ChartModule } from 'angular2-highcharts';


import {HomeComponent} from "./components/home/home.component";
import {LookoutComponent} from "./components/lookout/lookout.component";
import {AppComponent} from "./components/app/app.component";
import {HeaderComponent} from "./components/header/header.component";
import {TableComponent} from "./components/table/table.component";
import {TableService} from "./services/table.service";
import {OutputComponent} from "./components/output/output.component";

enableProdMode();

const routing = RouterModule.forRoot([
    { path: '',      component: HomeComponent },
    { path: 'Lookout', component: LookoutComponent }
]);

@NgModule({
    imports: 
    [BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule
    ],
    
    declarations: 
    [AppComponent,
    HomeComponent,
    LookoutComponent,
    AppComponent,
    HeaderComponent,
    TableComponent,
    OutputComponent,
    nvD3
    ],
    
    providers: [TableService],
    bootstrap: [AppComponent]
})

export class AppModule {}