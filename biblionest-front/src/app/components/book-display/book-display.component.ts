import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { faPen } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnChanges {

  faPen = faPen;

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

  redirectToModify(): void{
    this.router.navigate(['/modify_book/' + this.book_id]);
    return;
  }
}
