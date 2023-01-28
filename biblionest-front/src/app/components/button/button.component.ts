import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  public buttonText: string = '';

  @Input() 
  set text(name: string) {
    this.buttonText = name;
  }

  get name(): string {
    return this.buttonText;
  }
  
  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;

  onClick() {
    this.btnClick.emit();
  }
  
}
