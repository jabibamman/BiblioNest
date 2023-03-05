import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUploadService } from 'src/app/service/app-upload.service';
import { Book } from 'src/app/interface/ibook';
import { BookService } from 'src/app/service/book.service';
import { CommonService } from 'src/app/service/common.service';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: number;
  itemsPerPage: number;
  previousLabel: string;
  nextLabel: string;
  searchText: string;
  books : Book[];
  allBooks : Book[];

  constructor(private Router: Router, private BookService: BookService, protected common: CommonService, private userService: UserService, public appUpload: AppUploadService) {
    this.itemsPerPage = this.setNbItemsPerPage();
    this.page = common.getPage();
    this.previousLabel = 'Précédent';
    this.nextLabel = 'Suivant';
    this.books = this.BookService.getBooks();
    this.searchText = '';
    this.allBooks = this.books;
  }

  user:any;
  async ngOnInit(): Promise<void> { 
    try {
      this.userService.isLogged().subscribe(
        (response: any) => {
          this.user = response;   
          const getBooks = async () => {            
            await this.BookService.setBooksArray(this.user.id);
            this.books = this.BookService.getBooks();
            this.allBooks = this.books;
            this.allBooks.forEach(book => {
              if (!book.imgUrl.startsWith('http')) {
                this.appUpload.getFile(book.imgUrl).subscribe(file => {
                        const urlCreator = window.URL || window.webkitURL;
                        book.imgUrl = urlCreator.createObjectURL(file);                      
                    });
              }
            });      
          }
          getBooks();
        },
        (error:any) => {
          console.error(error);
          this.common.navigate('');
        }
      );
    } catch (error) {            
      console.log(error);
    } 
  }

  /**
   * @description set the number of items per page depending on the type of device
   * @returns number of items per page depending on the type of device
   */
  private setNbItemsPerPage(): number { return this.common.isMobile() ? 4 : 9; }

  /**
   * @description filter the books by title or author
  */
  async filterBooks(): Promise<void> {
    this.books = this.allBooks.filter(book => book.title.toLowerCase().includes(this.searchText.toLowerCase()) || book.author.toLowerCase().includes(this.searchText.toLowerCase()));
  }

}
