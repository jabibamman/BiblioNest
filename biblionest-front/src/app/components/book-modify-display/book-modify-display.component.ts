import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { BookService } from 'src/app/service/book.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-book-modify-display',
  templateUrl: './book-modify-display.component.html',
  styleUrls: ['./book-modify-display.component.css']
})
export class BookModifyDisplayComponent implements OnChanges {
  faCheck = faCheck;
  faPen = faPen;
  current_book: any;
  book_isbn: string | null = "default";
  bgColor: string = "white";

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, protected common: CommonService) {
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
      this.common.navigate('/home');
      return;
    }
    this.current_book = this.books[index];
    this.bgColor = this.bookService.getBackgroundColor(this.current_book.status);
  }


  // Fonction qui permet de changer la couleur de fond en fonction du statut du livre
  onStatusChange(event: any) {
    this.bgColor = this.common.onStatusChange(event);
  }  

  modifyImage() {
      // Afficher un formulaire de modification d'image ou appeler une API pour modifier l'image
  }

  saveChanges() {
      // Sauvegarder les modifications

      // Rediriger vers la page de visualisation du livre
      this.common.navigate("book/"+this.current_book.isbn);
  }

}