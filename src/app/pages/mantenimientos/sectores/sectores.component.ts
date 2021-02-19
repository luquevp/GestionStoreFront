import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


import { Sector } from 'src/app/models/sector.model';
import { SectorService } from '../../../services/sector.service';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.scss']
})
export class SectoresComponent implements OnInit {

public sectores: Sector[] = [];
// tslint:disable-next-line: no-inferrable-types
public cargando: boolean = true;
private imgSubs: Subscription;


  constructor(private sectorService: SectorService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService ) { }

  ngOnInit(): void {

    this.cargarSectores();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargarSectores() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarSectores();
    }

    this.busquedasService.buscar( 'sectores', termino )
        .subscribe( (resp: Sector[]) => {

          this.sectores = resp;

        });
  }


  cargarSectores() {
    this.cargando = true;
    this.sectorService.cargarSectores()
    .subscribe(sectores => {
      this.cargando = false;
      this.sectores = sectores;
    });
  }


  guardarCambios( sector: Sector ) {

    this.sectorService.actualizarSector( sector._id, sector.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', sector.nombre, 'success' );
        });

  }


  eliminarSector( sector: Sector ) {

    this.sectorService.borrarSector( sector._id )
        .subscribe( resp => {
          this.cargarSectores();
          Swal.fire( 'Borrado', sector.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear sector',
      text: 'Ingrese el nombre de la nueva sector',
      input: 'text',
      inputPlaceholder: 'Nombre de la sector',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      this.sectorService.crearSector( value )
        .subscribe( (resp: any) => {
          this.sectores.push( resp.sector )
        })
    }
  }

  abrirModal(sector: Sector) {

    this.modalImagenService.abrirModal( 'sectores', sector._id, sector.img );

  }


}
