import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { BookService } from 'src/app/service/book.service';
import { CommonService } from 'src/app/service/common.service';
import { AppUploadService } from 'src/app/service/app-upload.service';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnChanges {
  faPen = faPen;
  current_book: any;
  book_isbn: string | null = "default";
  bgColor: string = "white";

  constructor(private route: ActivatedRoute, private bookService: BookService, protected common: CommonService, public appUpload: AppUploadService) {
    this.books = this.bookService.getBooks();
  }

  @Input() books;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.book_isbn = this.route.snapshot.paramMap.get('isbn');
    
    // il faut utiliser bookId pour charger les données du livre depuis votre service de données
    this.route.paramMap.subscribe(params => {
      this.book_isbn = params.get('isbn');
      // mettre à jour les données du livre en fonction du nouveau bookId
    });

    let index = this.books.findIndex((obj) => obj.isbn === this.book_isbn);
    if(index === -1){
      this.common.navigate('/home');
      return;
    }
    this.current_book = this.books[index];
    this.bgColor = this.bookService.getBackgroundColor(this.current_book.status);
  }

  redirectToModify() {
    this.common.navigate("/modify_book/"+this.book_isbn);
  }

  // Fonction qui permet de changer la couleur de fond en fonction du statut du livre
  onStatusChange(event: any) {
    this.bgColor = this.common.onStatusChange(event);
  }
}
