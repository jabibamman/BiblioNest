import { Component, OnInit } from '@angular/core';
import { initNavbar } from './agency';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // TODO: get this value from the server (session) - for now, it's hardcoded
  isLogged: boolean = true;

  constructor() { }

  ngOnInit(): void {
    initNavbar();
  }

}
