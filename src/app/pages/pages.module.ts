import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        ComponentsModule,
        FormsModule,

    ],
    declarations:[
        DashboardComponent,
        Grafica1Component,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent
    ],
    exports: [],
})
export class PagesModule { }
