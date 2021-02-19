import { Sector } from './sector.model';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;


interface _EmpleadoUser {
    _id: string;
    userName: string;
    email: string;
    
}


export class Empleado {

    constructor(
        public name: string,
        public lastname: string,
        public cuil: string,
        public birthDate: string,
        public phoneNumber: string,
        public cellphoneNumber: string,
        public emergencyNumber: string,
        public street: string,
        public number: string,
        public betweenStreets: string,
        public isBuilding: boolean,
        public floor: string,
        public department: string,
        public instructions: string,
        public _id?: string,
        public img?: string,
        public usuario?: _EmpleadoUser,
        public sector?: Sector
    ) {}


   

}




