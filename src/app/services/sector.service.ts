import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Sector } from '../models/sector.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class SectorService {


  constructor( private http: HttpClient ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }



  cargarSectores() {

    const url = `${ base_url }/sectores`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, sectores: Sector[] }) => resp.sectores )
              );
  }

  crearSector( nombre: string ) {

    const url = `${ base_url }/sectores`;
    return this.http.post( url, { nombre }, this.headers );
  }

  actualizarSector( _id: string, nombre: string  ) {

    const url = `${ base_url }/sectores/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarSector( _id: string ) {

    const url = `${ base_url }/sectores/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
