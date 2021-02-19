import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Sector } from '../models/sector.model';
import { Empleado } from '../models/empleado.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

  private transformarSectores( resultados: any[] ): Sector[] {
   
    return resultados;

}

  private transformarEmpleados( resultados: any[] ): Empleado[] {
    return resultados;
  }

  buscar(
      tipo: 'usuarios'|'empleados'|'sectores',
      termino: string
    ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( (resp: any ) => {

                switch ( tipo ) {
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados )

                  case 'sectores':
                    return this.transformarSectores( resp.resultados )

                  case 'empleados':
                     return this.transformarEmpleados( resp.resultados )

                  default:
                    return [];
                }

              })
            );

  }


}
