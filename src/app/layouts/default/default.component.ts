import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor( private router: Router ) { }

ngOnInit() {
}


  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
