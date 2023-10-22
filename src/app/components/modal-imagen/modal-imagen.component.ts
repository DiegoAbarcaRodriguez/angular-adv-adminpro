import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  imagenSubir?: File;
  imagenTemp?: any;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService,
    private usuariosService: UsuarioService
  ) { }

  cerrarModal() {
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      this.imagenTemp = null;
      return;
    }

    //Conivierte la imagen capturada a un string base 64
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }


  }

  cargarImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir!, this.modalImagenService.tipo!, this.modalImagenService.id)
      .then(() => {
        Swal.fire('Exito', 'Se ha actualizado la imagen', 'success');
        this.modalImagenService.nuevaImagen.emit();
        this.cerrarModal();
      })
      .catch(() => Swal.fire('Error', 'Ha ocurrido un error al cargar la imagen', 'error'))
  }
}
