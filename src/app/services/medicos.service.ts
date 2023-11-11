import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs';

const baseURL = environment.base_url;

@Injectable({ providedIn: 'root' })
export class MedicosService {

    constructor(
        private httpClient: HttpClient
    ) { }

    get token() {
        return localStorage.getItem('token') || '';
    }


    cargarMedicos() {
        return this.httpClient.get<{ ok: boolean, medicos: Medico[] }>(baseURL + '/medicos', { headers: { 'x-token': this.token } })
            .pipe(
                map((resp) => resp.medicos)
            );
    }
    obtenerMedicoById(id: string) {
        return this.httpClient.get<{ ok: boolean, medico: Medico }>(baseURL + '/medicos/' + id, { headers: { 'x-token': this.token } })
            .pipe(
                map((resp) => resp.medico)
            );
    }

    crearMedico(medico: { nombre: string, hospitales: string, img?: string }) {
        return this.httpClient.post<{ ok: boolean, medico: Medico }>(baseURL + '/medicos', medico, { headers: { 'x-token': this.token } })
            .pipe(map(({ medico }) => medico))
    }

    actualizarMedico(medico: Medico) {
        return this.httpClient.put(baseURL + '/medicos/' + medico._id, medico, { headers: { 'x-token': this.token } })
    }
    eliminarMedico(_id: string) {
        return this.httpClient.delete(baseURL + '/medicos/' + _id, { headers: { 'x-token': this.token } })
    }


}