/* import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { ClinicaService } from '../../../services/clinica.service';
import { MedicoService } from '../../../services/medico.service';
import { delay } from 'rxjs/operators';
import { Clinica } from '../../../models/clinica.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public clinicas: Clinica[] = [];

  public medicoSeleccionado: Medico;
  public clinicaSeleccionado: Clinica;



  constructor( private fb: FormBuilder,
               private clinicaService: ClinicaService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarMedico( id ) );

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required ],
      clinica: ['', Validators.required ],
    });

    this.cargarClinicas();

    this.medicoForm.get('clinica').valueChanges
        .subscribe( clinicaId => {
          this.clinicaSeleccionado = this.clinicas.find( h => h._id === clinicaId );
        })
  }

  cargarMedico(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

    this.medicoService.obtenerMedicoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( medico => {

        if ( !medico ) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        const { nombre, clinica: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, clinica: _id });
      });

  }

  cargarClinicas() {

    this.clinicaService.cargarClinicas()
      .subscribe( (clinicas: Clinica[]) => {
        this.clinicas = clinicas;
      })

  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;

    if ( this.medicoSeleccionado ) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear

      this.medicoService.crearMedico( this.medicoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })
    }



  }

}
 */