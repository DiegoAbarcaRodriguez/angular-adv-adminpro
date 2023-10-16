import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

const baseURL = environment.base_url;

declare const google: any;

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    constructor(
        private httpClient: HttpClient,
        private router: Router) { }

    logout() {
        localStorage.removeItem('token');

        google.accounts.id.revoke('abarcarodriguezdiego@gmail.com', () => {
            this.router.navigateByUrl('/login');
        });
    }
    validarToken(): Observable<boolean> {
        const token = localStorage.getItem('token') || '';

        return this.httpClient.get(baseURL + '/login/renew', { headers: { 'x-token': token } })
            .pipe(
                tap((resp: any) => localStorage.setItem('token', resp.token)),
                map(resp => true),
                catchError(() => of(false))
            );


    }

    crearUsuario(formData: RegisterForm) {
        return this.httpClient.post(baseURL + '/usuarios', formData)
            .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)))
    }

    login(formData: LoginForm) {
        return this.httpClient.post(baseURL + '/login', formData)
            .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)))
    }

    loginGoogle(token: string) {
        return this.httpClient.post(baseURL + '/login/google', { token })
            .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)))
    }

}