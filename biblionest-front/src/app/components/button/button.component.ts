import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }

  // usage in html (in book-modify.component.html or any other component that uses this component):
  //<app-button [text]="'Valider'" (buttonClick)="addBook()"></app-button> // for example

}
