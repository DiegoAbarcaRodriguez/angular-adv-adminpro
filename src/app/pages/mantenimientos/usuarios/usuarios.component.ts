import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'usuarios-component',
    templateUrl: 'usuarios.component.html'
})

export class UsuariosComponent implements OnInit, OnDestroy {

    usuarios: Usuario[] = [];
    usuariosTemp: Usuario[] = [];
    totalUsuarios: number = 0;
    desde: number = 0;
    cargando: boolean = true;
    subscription?: Subscription;

    constructor(
        private usuarioService: UsuarioService,
        private busquedasService: BusquedasService,
        private modalImagenService: ModalImagenService
    ) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.cargarUsuarios();
        this.subscription = this.modalImagenService.nuevaImagen
            .pipe(delay(100))
            .subscribe(() => this.cargarUsuarios());
    }

    cargarUsuarios() {
        this.cargando = true;
        this.usuarioService.cargarUsuarios(this.desde)
            .subscribe(({ total, usuarios }) => {
                this.totalUsuarios = total;
                this.usuarios = usuarios;
                this.usuariosTemp = usuarios;
                this.cargando = false;
            });
    }

    cambiarPagina(valor: number) {
        this.desde += valor;

        if (this.desde < 0) this.desde = 0;

        if (this.desde >= this.totalUsuarios) this.desde -= valor

        this.cargarUsuarios();
    }

    buscar(termino: string) {

        if (termino.length === 0) {
            this.usuarios = this.usuariosTemp;
            return;
        }

        this.busquedasService.buscar('usuarios', termino)
            .subscribe(resp => this.usuarios = resp)

    }

    eliminarUsuario(usuario: Usuario) {

        if (usuario.uid === this.usuarioService.uid) {
            Swal.fire('Error', 'No puede eliminarse asi mismo', 'error');
            return;
        }


        Swal.fire({
            title: 'Borrar Usuario?',
            text: "Está a punto de eliminar al usuario" + usuario.nombre,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, borrarlo'
        }).then((result) => {
            if (result.isConfirmed)
                this.usuarioService.eliminarUsuario(usuario)
                    .subscribe(
                        () => {
                            this.cargarUsuarios();
                            Swal.fire('Usuario Eliminado', usuario.nombre + ' fue eliminado correctamente', 'success')
                        }
                    );
        })
    }

    cambiarRole(usuario: Usuario) {
        this.usuarioService.guardarUsuario(usuario)
            .subscribe(console.log)
    }

    abrirModal(usuario: Usuario) {
        console.log(usuario)
        this.modalImagenService.mostrarModal('usuarios', usuario.uid!, usuario.img!);
    }
}