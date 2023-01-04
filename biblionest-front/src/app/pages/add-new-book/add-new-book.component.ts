import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent {
  bookForm: FormGroup;
  books: { isbn: string; title: string; author: string; status: string; read_count: number; nb_pages: number; img_url: string; }[];

  constructor(private router: Router, private fb: FormBuilder, private BookService: BookService) {
    this.books = this.books = this.BookService.getBooks();

    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      nb_pages: [1],
      read_count: [0],
      status: ['to_read'],
      description: ['']
    });
  }

  addBook(): void{
    const values = this.bookForm.value;
    const book = {
      isbn: this.BookService.generateIsbn(),
      title: values.title,
      author: values.author,
      status: values.status,
      read_count: 0,
      description: values.description,
      nb_pages: values.nb_pages,
      img_url: 'default', 
    };
    this.BookService.addBook(book);
    this.redirectToHome();
  }

  redirectToHome(): void{
    this.router.navigate(['/']);
    return;
  }
  
}
