import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('buttonGoogle') buttonGoogle?: ElementRef;

  loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [false]
  });


  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '840090920838-eh02bue792cs60g7bis2g2t9tb2jjur3.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response) //!IMPORTANT: si se pone this.handleCredentialResponse, el this interno a este método apuntata a este método que se le pasa como callback y no al componente!!

    });
    google.accounts.id.renderButton(
      this.buttonGoogle?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);

    this.usuarioService.loginGoogle(response.credential)
      .subscribe({ next: (resp) => this.router.navigateByUrl('/') })
  }
  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe({
        next: (resp) => {
          console.log(resp)
          if (this.loginForm.get('remember')!.value) {
            localStorage.setItem('email', this.loginForm.get('email')!.value);
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        }, error: (err) => Swal.fire('Error', err.error.msg, 'error')
      })

  }
}
