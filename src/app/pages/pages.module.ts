import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
    ],
    declarations:[
        DashboardComponent,
        Grafica1Component,
        ProgressComponent,
        PagesComponent
    ],
    exports: [],
})
export class PagesModule { }
