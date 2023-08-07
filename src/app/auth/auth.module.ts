import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';


@NgModule({
    exports: [
        LoginComponent,
        RegisterComponent
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
  
})
export class AuthModule { }
