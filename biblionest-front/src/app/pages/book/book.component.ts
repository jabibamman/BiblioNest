import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  @Input() books = [
    { id:"lkgznlaizgjnr" ,title: 'Les Misérables', author: 'Victor Hugo', status: 'to_read', description:'Lorem Ipsum', nb_pages:200, img_url:'default' },
    { id:"e ozejg z" ,title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', status: 'read', description:'Lorem Ipsum', nb_pages:200, img_url:'default' },
    { id:"zegkzoegn" ,title: 'Le Seigneur des anneaux', author: 'Tolkien', status: 'reading', description:'Lorem Ipsum', nb_pages:200, img_url:'default' },
    { id:"zegzegzg" ,title: 'Les Fleurs du Mal', author: 'Charles Baudelaire', status: 'read', description:'Lorem Ipsum', nb_pages:200, img_url:'default' }
  ];

  ngOnInit(): void {}

}
