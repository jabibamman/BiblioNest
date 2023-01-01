import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-book-modify-display',
  templateUrl: './book-modify-display.component.html',
  styleUrls: ['./book-modify-display.component.css']
})
export class BookModifyDisplayComponent implements OnChanges {
  faCheck = faCheck;

  @Input() books:any[] = [{title:"test"}];

  current_book: any;
  book_id: string | null = "default";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.book_id = this.route.snapshot.paramMap.get('id');
    // utilisez bookId pour charger les données du livre depuis votre service de données

    this.route.paramMap.subscribe(params => {
      this.book_id = params.get('id');
      // mettez à jour les données du livre en fonction du nouveau bookId
    });

    // récupération de la valeur de la propriété "books"
    console.log(this.book_id);
    let index = this.books.findIndex((obj) => obj.id === this.book_id);
    if(index === -1){
      this.router.navigate(['/']);
      return;
    }
    this.current_book = this.books[index];
  }

  redirectToDisplay(): void{
    this.router.navigate(['/book/' + this.book_id]);
    return;
  }

}
