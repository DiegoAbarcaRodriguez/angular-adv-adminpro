import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const baseURL = environment.base_url;

@Injectable({ providedIn: 'root' })
export class BusquedasService {
    constructor(private httpClient: HttpClient) { }

    get token() {
        return localStorage.getItem('token') || '';
    }

    transformarUsuarios(resultados: any[]): Usuario[] {
      return  resultados.map(usuario=>new Usuario(usuario.nombre,usuario.email,'',usuario.role,usuario.img,usuario.google,usuario.uid));
    }

    buscar(tipo: 'usuarios' | 'hospitales' | 'medicos', termino: string = '') {
        return this.httpClient.get(baseURL + '/todo/coleccion/' + tipo + '/' + termino, { headers: { 'x-token': this.token } })
            .pipe(map((resp: any) => {
                switch (tipo) {
                    case 'usuarios':
                        return this.transformarUsuarios(resp.resultados)
                        break;

                    default:
                        return [];
                        break;
                }
            }));
    }
}