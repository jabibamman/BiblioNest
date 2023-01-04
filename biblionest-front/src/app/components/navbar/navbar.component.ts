import { Component, OnInit } from '@angular/core';
import { initNavbar } from './agency';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faBars = faBars;

  // TODO: get this value from the server (session) - for now, it's hardcoded
  isLogged: boolean = true;

  constructor() { }

  ngOnInit(): void {
    initNavbar();
  }

}
