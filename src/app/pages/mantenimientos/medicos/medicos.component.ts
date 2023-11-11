import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  cargando: boolean = true;
  medicos: Medico[] = [];
  subscription?: Subscription;

  constructor(
    private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.subscription = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe(() => {
        this.cargarMedicos();
      })
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos()
      .subscribe(resp => {
        this.cargando = false;
        this.medicos = resp;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.mostrarModal('medicos', medico._id!, medico.img!);
  }

  buscarMedico(termino: string) {



    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }


    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => this.medicos = resp)


  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar Médico?',
      text: "Está a punto de eliminar al médico" + medico.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed)
        this.medicosService.eliminarMedico(medico._id!)
          .subscribe(
            () => {
              this.cargarMedicos();
              Swal.fire('Médico Eliminado', medico.nombre + ' fue eliminado correctamente', 'success')
            }
          );
    })
  }
}
