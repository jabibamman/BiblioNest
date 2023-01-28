import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
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
  @Input() type: string = 'button';
  @Input() isDisabled = false;

  @Input()
  icon: IconProp = faBook;

  onClick() {
    this.btnClick.emit();
  }

}
