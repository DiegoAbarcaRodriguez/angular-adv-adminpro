import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup = this.fb.group({
    nombre: ['Diego', Validators.required],
    email: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [false, [Validators.required, Validators.requiredTrue]]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  private formSubmited = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }

  crearUsuario() {
    this.formSubmited = true;

    if (this.registerForm.invalid) return;

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => Swal.fire('Error', err.error.msg, 'error')
      });


  }

  campoNoValido(campo: string) {
    return this.registerForm.controls[campo].invalid && this.formSubmited;


  }

  passwordsIguales(passwordName: string, passwordName2: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(passwordName)?.value;
      const password2 = formGroup.get(passwordName2)?.value;

      if (password === password2) {
        formGroup.get(passwordName2)?.setErrors(null);
      } else {
        formGroup.get(passwordName2)?.setErrors({ noEsIgual: true });
      }
    }
  }
}
