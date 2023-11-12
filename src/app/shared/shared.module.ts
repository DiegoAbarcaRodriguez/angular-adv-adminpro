import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
    exports: [
        BreadcrumbComponent,
        HeaderComponent,
        SidebarComponent
    ],
    declarations: [
        BreadcrumbComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }
