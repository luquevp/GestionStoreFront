import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { ClinicaService } from '../../../services/clinica.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


import { Clinica } from 'src/app/models/clinica.model';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss']
})
export class ClinicasComponent implements OnInit {

public clinicas: Clinica[] = [];
// tslint:disable-next-line: no-inferrable-types
public cargando: boolean = true;
private imgSubs: Subscription;


  constructor(private clinicaService: ClinicaService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService ) { }

  ngOnInit(): void {

    this.cargarClinicas();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargarClinicas() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarClinicas();
    }

    this.busquedasService.buscar( 'clinicas', termino )
        .subscribe( resp => {

          this.clinicas = resp;

        });
  }


  cargarClinicas() {
    this.cargando = true;
    this.clinicaService.cargarClinicas()
    .subscribe(clinicas => {
      this.cargando = false;
      this.clinicas = clinicas;
    });
  }


  guardarCambios( clinica: Clinica ) {

    this.clinicaService.actualizarClinica( clinica._id, clinica.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', clinica.nombre, 'success' );
        });

  }


  eliminarClinica( clinica: Clinica ) {

    this.clinicaService.borrarClinica( clinica._id )
        .subscribe( resp => {
          this.cargarClinicas();
          Swal.fire( 'Borrado', clinica.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear clinica',
      text: 'Ingrese el nombre de la nueva clinica',
      input: 'text',
      inputPlaceholder: 'Nombre de la clinica',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      this.clinicaService.crearClinica( value )
        .subscribe( (resp: any) => {
          this.clinicas.push( resp.clinica )
        })
    }
  }

  abrirModal(clinica: Clinica) {

    this.modalImagenService.abrirModal( 'clinicas', clinica._id, clinica.img );

  }


}
