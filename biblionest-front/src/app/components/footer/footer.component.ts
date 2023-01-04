import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faGithub = faGithub;
  faCopyright = faCopyright;
  year: Number = new Date().getFullYear();

  constructor(private Router: Router) { }

  ngOnInit(): void {
  }

  navigate(page: string) {
    this.Router.navigate([page]);     // redirige vers la page demandée
  }

}
