import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  medicoForm?: FormGroup;
  hospitales: Hospital[] = [];
  hospitalSeleccionado?: Hospital;

  medicoSeleccionado?: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicosService: MedicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospitales: ['', Validators.required],

    });

    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));



    this.medicoForm.get('hospitales')?.valueChanges
      .subscribe(value => {
        this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === value);
      });

    this.cargarHospitales();
  }

  cargarMedico(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.medicosService.obtenerMedicoById(id)
      .pipe(delay(100))
      .subscribe(medico => {

        const { nombre, hospitales } = medico;
        this.medicoSeleccionado = medico;
  

        this.medicoForm?.setValue({ nombre, hospitales: hospitales?._id });


      }, () => this.router.navigate(['/dashboard/medicos']));
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {

    const { nombre } = this.medicoForm?.value;

    if (this.medicoSeleccionado) {

      const data = {
        ...this.medicoForm?.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicosService.actualizarMedico(data)
        .subscribe((resp) => {
          Swal.fire('Actualizado', nombre + ' actualizado correctamente', 'success');
        });

    } else {

      this.medicosService.crearMedico(this.medicoForm?.value)
        .subscribe(resp => {
          Swal.fire('Creado', nombre + ' creado correctamente', 'success');
          this.router.navigate(['/dashboard/medicos', resp._id]);
        });
    }


  }


}
