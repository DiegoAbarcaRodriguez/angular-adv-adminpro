import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PipesModule

    ],
    declarations: [
        DashboardComponent,
        Grafica1Component,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
        UsuariosComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent
    ],
    exports: [],
})
export class PagesModule { }
