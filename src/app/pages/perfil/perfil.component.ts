import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  perfilForm?: FormGroup;
  usuario!: Usuario;
  imagenSubir?: File;
  imagenTemp?: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })

  }

  actualizarPerfil() {
    this.usuarioService.actualizarPefil(this.perfilForm?.value)
      .subscribe(() => {
        this.usuario.email = this.perfilForm?.get('email')?.value;
        this.usuario.nombre = this.perfilForm?.get('nombre')?.value;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, err => Swal.fire('error', err.error.msg, 'error'));
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

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      })
      .catch(err => Swal.fire('Error', 'Ha ocurrido un error al subir la imagenF', 'error'));

  }

}
