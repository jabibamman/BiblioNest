import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent {

  bookForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      nb_pages: [1],
      status: ['to_read'],
      description: ['']
    });
  }

  books = [
    { id:"lkgznlaizgjnr" ,title: 'Les Misérables', author: 'Victor Hugo', status: 'to_read', description:'Lorem Ipsum', nb_pages:200, img_url:'default' },
    { id:"e ozejg z" ,title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', status: 'read', description:'Lorem Ipsum', nb_pages:200, img_url:'default' },
    { id:"zegkzoegn" ,title: 'Le Seigneur des anneaux', author: 'Tolkien', status: 'reading', description:'Lorem Ipsum', nb_pages:200, img_url:'default' },
    { id:"zegzegzg" ,title: 'Les Fleurs du Mal', author: 'Charles Baudelaire', status: 'read', description:'Lorem Ipsum', nb_pages:200, img_url:'default' }
  ];

  addBook(): void{
    const values = this.bookForm.value;
    const book = {
      id: 'lkgznlaizgjnr',
      title: values.title,
      author: values.author,
      status: values.status,
      description: values.description,
      nb_pages: values.nb_pages,
      img_url: 'default'
    };
    this.books.push(book);
    console.log(this.books);
    //this.redirectToHome();
  }

  redirectToHome(): void{
    this.router.navigate(['/']);
    return;
  }

}
