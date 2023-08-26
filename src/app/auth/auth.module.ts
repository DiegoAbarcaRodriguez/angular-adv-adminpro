import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
    exports: [
        LoginComponent,
        RegisterComponent
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule,
        FormsModule
    ],
  
})
export class AuthModule { }
