import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo?: 'usuarios' | 'hospitales' | 'medicos';
  public id: string = '';
  public img: string = 'no-img.jpg';

  public nuevaImagen: EventEmitter<string> = new EventEmitter()

  get ocultarModal() {
    return this._ocultarModal;
  }

  mostrarModal(tipo: 'usuarios' | 'hospitales' | 'medicos', id: string, img: string) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;


    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${baseUrl}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
