import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

/*   public menu = [];


  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  } */


menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },

      ]
    },

    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Sectores', url: 'sectores' },
        { titulo: 'Empleados', url: 'empleados' },
      ]
    },
  ]; 

  constructor() { }
}
