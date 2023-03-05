import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/service/common.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css'],
})
export class AddNewBookComponent {
  faPlusCircle = faPlusCircle;
  bookForm: FormGroup;
  fileForm: FormGroup;
  books;
  file: any;

  user: any;
  async ngOnInit(): Promise<void> {
    this.userService.isLogged().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error:any) => {
        console.error(error);
        this.common.navigate('');
      }
    );
  }

  constructor(private router: Router, private fb: FormBuilder, private BookService: BookService, protected common: CommonService, private http : HttpClient, private userService: UserService) {
    this.books = this.BookService.getBooks();

    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      publishedDate: [''],
      isbn: [''],
      nbPages: [1],
      read_count: [0],
      status: ['to_read'],
      description: [''],
      userId: [0],
    });

    this.fileForm = this.fb.group({
      currentInput: null,
    });
  }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
    }
  }
  
  addBook(): void {
    this.common.toTheTop();
    const values = this.bookForm.value;
    const book = {
      id: values.id,
      isbn: values.isbn,
      title: values.title,
      author: values.author,
      publishedDate: values.publishedDate,
      status: values.status,
      readCount: values.read_count,
      description: values.description,
      nbPages: values.nbPages,
      imgUrl: 'default',
      userId: this.user.id,
    };

    if (
      this.books.find(
        (obj) =>
          obj.title.toLowerCase() === book.title.toLowerCase() &&
          obj.author.toLowerCase() === book.author.toLowerCase()
      )
    ) {
      this.bookForm.setErrors({ duplicate: true });
      return;
    }

    if (!book.title || !book.author) {
      this.bookForm.setErrors({ required: true });
      return;
    }

    if (book.nbPages < 1) {
      this.bookForm.setErrors({ invalidNbPages: true });
      return;
    }

    if (book.readCount == 0) {
      book.readCount = 1;
    }

    if (
      book.title.length < 3 ||
      book.author.length < 3 ||
      book.title.length > 200 ||
      book.author.length > 150 ||
      book.description.length > 1500 ||
      book.isbn.length > 13
    ) {
      this.bookForm.setErrors({ invalidLength: true });
      return;
    }

    if (!this.isValidIsbn(book.isbn)) {
      this.bookForm.setErrors({ invalidIsbn: true });
      return;
    }

    book.title = book.title.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    book.author = book.author.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });

    this.BookService.addBook(book);

    try {
      this.BookService.createBook(book, this.file);
    } catch (e) {
      console.log(e);
    }
  }

  isValidIsbn(isbn: string): boolean {
    const books = this.BookService.getBooks();
    for (const book of books) {
      if (book.isbn === isbn) {
        return false;
      }
    }

    return true;
  }
}

