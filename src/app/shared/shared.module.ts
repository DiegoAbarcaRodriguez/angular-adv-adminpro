import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



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
        CommonModule
    ]
})
export class SharedModule { }
