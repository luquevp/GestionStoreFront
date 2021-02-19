import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Empleado } from '../models/empleado.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarEmpleados() {

    const url = `${ base_url }/empleados`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, empleados: Empleado[] }) => resp.empleados )
              );
  }

  obtenerEmpleadoPorId( id: string ) {

    const url = `${ base_url }/empleados/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, empleado: Empleado }) => resp.empleado )
              );
  }

  crearEmpleado( empleado: { nombre: string, clinica: string } ) {

    const url = `${ base_url }/empleados`;
    return this.http.post( url, empleado, this.headers );
  }

  // tslint:disable-next-line: typedef
  actualizarEmpleado( empleado: Empleado  ) {

    const url = `${ base_url }/empleados/${ empleado._id }`;
    return this.http.put( url, empleado, this.headers );
  }

  borrarEmpleado( _id: string ) {

    const url = `${ base_url }/empleados/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
