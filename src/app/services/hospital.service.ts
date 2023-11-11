import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const baseURL = environment.base_url;

@Injectable({ providedIn: 'root' })
export class HospitalService {

    constructor(
        private httpClient: HttpClient,
        private router: Router) { }

    get token() {
        return localStorage.getItem('token') || '';
    }


    cargarHospitales() {
        return this.httpClient.get<{ ok: boolean, hospitales: Hospital[] }>(baseURL + '/hospitales', { headers: { 'x-token': this.token } })
            .pipe(
                map((resp) => resp.hospitales)
            );
    }

    crearHospital(nombre: string) {
        return this.httpClient.post<{ ok: boolean, hospital: Hospital }>(baseURL + '/hospitales', { nombre }, { headers: { 'x-token': this.token } })
            .pipe(map(({ hospital }) => hospital))
    }

    actualizarHospital(_id: string, nombre: string) {
        return this.httpClient.put(baseURL + '/hospitales/' + _id, { nombre }, { headers: { 'x-token': this.token } })
    }
    eliminarHospital(_id: string) {
        return this.httpClient.delete(baseURL + '/hospitales/' + _id, { headers: { 'x-token': this.token } })
    }


}