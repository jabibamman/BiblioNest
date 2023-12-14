import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPen,faTrash,faTimes } from '@fortawesome/free-solid-svg-icons';
import { BookService } from 'src/app/service/book.service';
import { CommonService } from 'src/app/service/common.service';
import { AppUploadService } from 'src/app/service/app-upload.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-modify-display',
  templateUrl: './book-modify-display.component.html',
  styleUrls: ['./book-modify-display.component.css'],
})
export class BookModifyDisplayComponent implements OnChanges {
  faCheck = faCheck;
  faPen = faPen;
  faTimes = faTimes
  faTrash = faTrash;
  current_book: any;
  book_isbn: string | null = 'default';
  bgColor: string = 'white';
  bookForm: any;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, protected common: CommonService, public appUpload: AppUploadService, private fb: FormBuilder) {
    this.books = this.bookService.getBooks();

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
  }

  @Input() books;

  ngOnChanges(changes: SimpleChanges): void {
    this.book_isbn = this.route.snapshot.paramMap.get('isbn');
    // utilisez bookId pour charger les données du livre depuis votre service de données

    this.route.paramMap.subscribe((params) => {
      this.book_isbn = params.get('isbn');
      // mettez à jour les données du livre en fonction du nouveau bookId
    });

    let index = this.books.findIndex((obj) => obj.isbn === this.book_isbn);
    if (index === -1) {
      this.common.navigate('/home');
      return;
    }
    this.current_book = this.books[index];
    this.bgColor = this.bookService.getBackgroundColor(
      this.current_book.status
    );
  }

  // Fonction qui permet de changer la couleur de fond en fonction du statut du livre
  onStatusChange(event: any) {
    this.bgColor = this.common.onStatusChange(event);
  }

  modifyImage() {
    // Afficher un formulaire de modification d'image ou appeler une API pour modifier l'image
  }

  cancelChanges() {
    // Annuler les modifications
    this.common.toTheTop();
    this.common.navigate("book/"+this.current_book.isbn);
  }

  saveChanges() {
    // Sauvegarder les modifications
    const values = this.bookForm.value;
    const book = {
      id: this.current_book.id,
      isbn: values.isbn,
      title: values.title,
      author: values.author,
      publishedDate: values.publishedDate,
      status: values.status,
      readCount: values.read_count,
      description: values.description,
      nbPages: values.nbPages,
      imgUrl: 'default',
      userId: 0,
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

    if(book.nbPages < 1){
      this.bookForm.setErrors({ invalidNbPages: true });
      return;
    }

    if(book.readCount == 0){
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

    book.title = book.title.replace(/\w\S*/g, (txt: string) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    book.author = book.author.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });

    this.bookService.addBook(book);

    try {
      this.bookService.modifyBook(book.isbn, book);
    } catch (e) {
      console.log(e);
    }

    // Rediriger vers la page de visualisation du livre
    this.common.toTheTop();
    this.common.navigate("book/"+this.current_book.isbn);
  }

  deleteBook() {
    this.bookService.deleteBook(this.current_book.id);
    this.common.navigate('/home');
  }
}
