import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Empleado } from '../../../models/empleado.model';

import { SectorService } from '../../../services/sector.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { delay } from 'rxjs/operators';
import { Sector } from '../../../models/sector.model';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [
  ]
})
export class EmpleadoComponent implements OnInit {

  public empleadoForm: FormGroup;
  public sectores: Sector[] = [];

  public empleadoSeleccionado: Empleado;
  public sectorSeleccionado: Sector;

  public propiedades: Array<any> = [{
    id: 0,
    label: 'Nombre',
    type: 'text',
    formControlName: 'name',
    placeholder: 'Nombre'
  },
  {
    id: 1,
    label: 'Apellido',
    type: 'text',
    formControlName: 'lastname',
    placeholder: 'Apellido'
  }
];

  constructor( private fb: FormBuilder,
               private sectorService: SectorService,
               private empleadoService: EmpleadoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarEmpleado( id ) );

    this.empleadoForm = this.fb.group({
      name: ['', Validators.required ],
      sector: ['', Validators.required ],
      lastname: ['', Validators.required ],
      cuil: ['', Validators.required ],
      birthDate: ['', Validators.required ],


    });

    this.cargarSectores();

    this.empleadoForm.get('sector').valueChanges
        .subscribe( sectorId => {
          this.sectorSeleccionado = this.sectores.find( s => s._id === sectorId );
        })
  }

  cargarEmpleado(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

    this.empleadoService.obtenerEmpleadoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( empleado => {

        if ( !empleado ) {
          return this.router.navigateByUrl(`/empleados`);
        }

        const { name, lastname, cuil, birthDate, sector: { _id } } = empleado;
        this.empleadoSeleccionado = empleado;
        this.empleadoForm.setValue({ name, lastname, cuil , birthDate, sector: _id });
      });

  }

  cargarSectores() {

    this.sectorService.cargarSectores()
      .subscribe( (sectores: Sector[]) => {
        this.sectores = sectores;
      })

  }

  guardarEmpleado() {

    const { name } = this.empleadoForm.value;

    if ( this.empleadoSeleccionado ) {
      // actualizar
      const data = {
        ...this.empleadoForm.value,
        _id: this.empleadoSeleccionado._id
      }
      this.empleadoService.actualizarEmpleado( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ name } actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/empleados`);
        })

    } else {


      // crear

      this.empleadoService.crearEmpleado( this.empleadoForm.value )
          .subscribe( (resp: any) => {
          console.log(resp);
            Swal.fire('Creado', `${ name } creado correctamente`, 'success');
            //this.router.navigateByUrl(`/empleado/${ resp.empleado._id }`
            this.router.navigateByUrl(`/empleados`);
        })
    }



  }

}
