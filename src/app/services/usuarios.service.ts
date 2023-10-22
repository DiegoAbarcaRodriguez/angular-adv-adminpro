import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';

const baseURL = environment.base_url;

declare const google: any;

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    constructor(
        private httpClient: HttpClient,
        private router: Router) { }

    usuario!: Usuario;

    get token() {
        return localStorage.getItem('token') || '';
    }

    get uid() {
        return this.usuario.uid || '';
    }

    logout() {
        localStorage.removeItem('token');
        if (this.usuario.google)
            google.accounts.id.revoke(this.usuario.email, () => {
            });

        this.router.navigateByUrl('/login');
    }


    validarToken(): Observable<boolean> {


        return this.httpClient.get(baseURL + '/login/renew', { headers: { 'x-token': this.token } })
            .pipe(
                map((resp: any) => {
                    const { email, google, nombre, role, img, uid } = resp.usuario;
                    this.usuario = new Usuario(nombre, email, img ?? '', role, img, google, uid);
                    localStorage.setItem('token', resp.token);
                    return true
                }),
                catchError(() => of(false))
            );


    }

    crearUsuario(formData: RegisterForm) {
        return this.httpClient.post(baseURL + '/usuarios', formData)
            .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)))
    }

    actualizarPefil(data: { email: string, nombre: string, role: string }) {
        data = {
            ...data,
            role: this.usuario.role ?? 'USER_ROLE'
        }

        return this.httpClient.put(baseURL + '/usuarios/' + this.uid, data, { headers: { 'x-token': this.token } })
    }

    login(formData: LoginForm) {
        return this.httpClient.post(baseURL + '/login', formData)
            .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)))
    }

    loginGoogle(token: string) {
        return this.httpClient.post(baseURL + '/login/google', { token })
            .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)))
    }

    cargarUsuarios(desde: number = 0) {
        return this.httpClient.get<CargarUsuario>(baseURL + '/usuarios?desde=' + desde, { headers: { 'x-token': this.token } })
            .pipe(map(resp => {
                const usuarios = resp.usuarios.map(usuario => new Usuario(usuario.nombre, usuario.email, '', usuario.role, usuario.img, usuario.google, usuario.uid));

                return {
                    usuarios,
                    total: resp.total
                }
            }));
    }

    eliminarUsuario(usuario: Usuario) {
        return this.httpClient.delete(baseURL + '/usuarios/' + usuario.uid, { headers: { "x-token": this.token } });
    }

    guardarUsuario(usuario: Usuario) {
        return this.httpClient.put(baseURL + '/usuarios/' + usuario.uid, usuario, { headers: { 'x-token': this.token } })
    }

}