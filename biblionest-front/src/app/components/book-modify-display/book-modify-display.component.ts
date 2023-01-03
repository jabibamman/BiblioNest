import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-modify-display',
  templateUrl: './book-modify-display.component.html',
  styleUrls: ['./book-modify-display.component.css']
})
export class BookModifyDisplayComponent implements OnChanges {
  faCheck = faCheck;
  current_book: any;
  book_isbn: string | null = "default";
  bgColor: string = "white";

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  @Input() books;

  ngOnChanges(changes: SimpleChanges): void {
    this.book_isbn = this.route.snapshot.paramMap.get('isbn');
    // utilisez bookId pour charger les données du livre depuis votre service de données

    this.route.paramMap.subscribe(params => {
      this.book_isbn = params.get('isbn');
      // mettez à jour les données du livre en fonction du nouveau bookId
    });

    let index = this.books.findIndex((obj) => obj.isbn === this.book_isbn);
    if(index === -1){
      this.router.navigate(['/']);
      return;
    }
    this.current_book = this.books[index];
    this.bgColor = this.bookService.getBackgroundColor(this.current_book.status);
  }

  redirectToDisplay(): void{
    this.router.navigate(['/book/' + this.book_isbn]);
    return;
  }

  // Fonction qui permet de changer la couleur de fond en fonction du statut du livre
  onStatusChange(event: any) {
    event ? this.bgColor = this.bookService.getBackgroundColor(event.value) : this.bgColor = 'white';
  }
  
}