interface _SectorUser {
  _id: string;
  nombre: string;
  img: string;
}


export class Sector {

  constructor(
      public nombre: string,
      public _id?: string,
      public img?: string,
      public usuario?: _SectorUser,
  ) {}

}

