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
  books;

  constructor(private router: Router, private fb: FormBuilder, private BookService: BookService, protected common: CommonService, private http : HttpClient) {
    this.books = this.BookService.getBooks();

    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      publishedDate: [''],
      isbn: [''],
      nbPages: [1],
      read_count: [0],
      status: ['to_read'],
      description: ['']
    });
  }

  addBook(): void{
    this.common.toTheTop();
    const values = this.bookForm.value;
    const book = {
      isbn: values.isbn,
      title: values.title,
      author: values.author,
      publishedDate: values.publishedDate,
      status: values.status,
      readCount: values.read_count,
      read_count: values.read_count,
      description: values.description,
      nbPages: values.nbPages,
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

    if(book.nbPages < 1){
      this.bookForm.setErrors({ invalidNbPages: true });
      return;
    }

    if(book.title.length < 3 || book.author.length < 3 || book.title.length > 75 || book.author.length > 25){
      this.bookForm.setErrors({ invalidLength: true });
      return;
    }


    if(book.isbn.length !== 13) {
      this.BookService.getISBNBook(book.title, '').then((isbn) => {
        if(isbn == null) {
          this.bookForm.setErrors({ invalidIsbn: true });
        }else {
          book.isbn = isbn;
        }  
      });

    }


    book.title = book.title.replace(/\w\S*/g, (txt: string) => { return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(); });
    book.author = book.author.replace(/\w\S*/g, (txt: string) => { return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(); });

    this.BookService.addBook(book);
    if(book.img_url === 'default'){      
      this.BookService.getBookCover('', book.title, '').then((value) => {
        if(value === null){
          value = 'default';
        }    
        this.BookService.books[this.BookService.books.length - 1].img_url = value; 
      });
    }

    if(book.nbPages === 1){
      this.BookService.getBookPageCount('', book.title, '').then((pageCount) => {        
        if(pageCount == null) {
          this.bookForm.setErrors({ invalidPageCount: true });
        }else {
          this.BookService.books[this.BookService.books.length - 1].nbPages = pageCount;
        }
      });
    }

    if(book.publishedDate === ''){
      this.BookService.getBookPublishedDate('', book.title, '').then((publishedDate) => {
        if(publishedDate == null) {
          this.bookForm.setErrors({ invalidPublishedDate: true });
        }else {
          this.BookService.books[this.BookService.books.length - 1].publishedDate = publishedDate;
        }
      });
    }

    if(book.description === ''){
      this.BookService.getBookDescription('', book.title, '').then((description) => {
        if(description == null) {
          this.bookForm.setErrors({ invalidDescription: true });
        }else {
          this.BookService.books[this.BookService.books.length - 1].description = description;
        }
      });
    }


    this.common.navigate('/home');
  }
  
}