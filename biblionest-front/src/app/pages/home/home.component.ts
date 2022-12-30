import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books = [
    { isbn: '1234567890', title: 'Les Misérables', author: 'Victor Hugo', status: 'to_read', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253096337-001-T.jpeg' },
    { isbn: '0987654321', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', status: 'read', read_count:4, nb_pages:200, img_url:'https://m.media-amazon.com/images/I/71lyHAf7XXL.jpg' },
    { isbn: '1231231231', title: 'Le Rouge et le Noir', author: 'Stendhal', status: 'reading', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253006206-001-T.jpeg' }
];

  constructor(private Router: Router) { }

  ngOnInit(): void { }

  navigate(page: string) {
    this.Router.navigate([page]);     // redirige vers la page demandée
  }
}
