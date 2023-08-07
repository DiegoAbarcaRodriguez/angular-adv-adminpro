import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



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

})
export class SharedModule { }
