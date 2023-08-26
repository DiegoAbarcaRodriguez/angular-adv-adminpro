import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
    constructor() { }

    menu: any[] = [
        {
            titulo: 'dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                {titulo: 'Main', url: '/'},
                {titulo: 'ProgressBar', url: 'progress'},
                {titulo: 'Gráficas', url: 'grafica1'},

            ]
        }
    ]
}