import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/service/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent {
  faPlusCircle = faPlusCircle;
  bookForm: FormGroup;
  books: { isbn: string; title: string; author: string; status: string; read_count: number; nb_pages: number; img_url: string; }[];

  constructor(private router: Router, private fb: FormBuilder, private BookService: BookService, protected common: CommonService, private http : HttpClient) {
    this.books = this.books = this.BookService.getBooks();

    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      publishedDate: [''],
      nb_pages: [1],
      read_count: [0],
      status: ['to_read'],
      description: ['']
    });
  }

  addBook(): void{
    this.common.toTheTop();
    const values = this.bookForm.value;
    const book = {
      isbn: this.BookService.generateIsbn(),
      title: values.title,
      author: values.author,
      publishedDate: values.publishedDate,
      status: values.status,
      read_count: values.read_count,
      description: values.description,
      nb_pages: values.nb_pages,
      img_url: 'default', 
    };

    if(this.books.find((obj) => obj.title.toLowerCase() === book.title.toLowerCase() && obj.author.toLowerCase() === book.author.toLowerCase())){
      this.bookForm.setErrors({ duplicate: true });
      return;
    }

    if(!book.title || !book.author){
      this.bookForm.setErrors({ required: true });
      return;
    }

    if(book.nb_pages < 1){
      this.bookForm.setErrors({ invalidNbPages: true });
      return;
    }

    if(book.title.length < 3 || book.author.length < 3 || book.title.length > 75 || book.author.length > 25){
      this.bookForm.setErrors({ invalidLength: true });
      return;
    }
    
    this.BookService.addBook(book);
    // si l'image n'est pas chargée, on met une image que l'on récupère sur l'api 
    if(book.img_url === 'default'){
      const bookCover = this.BookService.getBookCover(book.title, book.author, book.publishedDate);

      bookCover.then((value) => {
        if(value === null){
          value = 'default';
        }else{
          this.BookService.books[this.BookService.books.length - 1].img_url = value;
        }
      });

    }
      
    this.common.navigate('/');
  }
  
}