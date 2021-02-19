import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Empleado } from '../../../models/empleado.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']

})
export class EmpleadosComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: no-inferrable-types
  public cargando: boolean = true;
  public empleados: Empleado[] = [];
  private imgSubs: Subscription;

  constructor( private empleadoService: EmpleadoService,
               public modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarEmpleados();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarEmpleados() );
  }

  cargarEmpleados() {
    this.cargando = true;
    this.empleadoService.cargarEmpleados()
      .subscribe( empleados => {
        this.cargando = false;
        this.empleados = empleados;
        console.log(this.empleados);
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarEmpleados();
    }

    this.busquedasService.buscar( 'empleados', termino )
        .subscribe( (resp: Empleado[]) => {
          this.empleados = resp;
        });
  }

  

  abrirModal(empleado: Empleado) {

    this.modalImagenService.abrirModal( 'empleados', empleado._id, empleado.img );

  }

  borrarEmpleado( empleado: Empleado ) {

    Swal.fire({
      title: '¿Borrar empleado?',
      text: `Esta a punto de borrar a ${ empleado.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.empleadoService.borrarEmpleado( empleado._id )
          .subscribe( resp => {

            this.cargarEmpleados();
            Swal.fire(
              'Empleado borrado',
              `${ empleado.name } fue eliminado correctamente`,
              'success'
            );

          });

      }
    });

  }

}
