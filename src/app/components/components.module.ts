import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';


@NgModule({
    exports: [
        IncrementadorComponent,
        DonaComponent,
        ModalImagenComponent
    ],
    declarations: [
        IncrementadorComponent,
        DonaComponent,
        ModalImagenComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgChartsModule
    ]

})
export class ComponentsModule { }
