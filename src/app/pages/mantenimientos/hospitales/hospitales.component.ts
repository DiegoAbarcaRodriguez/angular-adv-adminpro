import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  private imagenSubscription?: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }

  ngOnDestroy(): void {
    this.imagenSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imagenSubscription = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe((resp) => {
        this.cargando = false
        this.hospitales = resp
      });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe(resp => Swal.fire('Actualizado', hospital.nombre, 'success'))
  }

  eliminarHospital(hospital: Hospital) {


    Swal.fire({
      title: 'Borrar Hospital?',
      text: "Está a punto de eliminar el hospital" + hospital.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed)
        this.hospitalService.eliminarHospital(hospital._id!)
          .subscribe(resp => {
            this.cargarHospitales();
            Swal.fire('Eliminado', hospital.nombre, 'success')
          })
    });


  }

  async abrirSweetAlert() {

    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    });


    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!)
        .subscribe((resp: any) => {
          this.hospitales.push(resp);
        });
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.mostrarModal('hospitales', hospital._id!, hospital.img!);
  }

  buscarHospital(termino: string) {

    if (termino.length === 0) {
      this.cargarHospitales();
      return;
    }


    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => this.hospitales = resp)
  }

}

