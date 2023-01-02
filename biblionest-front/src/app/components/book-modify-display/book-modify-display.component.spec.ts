import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModifyDisplayComponent } from './book-modify-display.component';

describe('BookModifyDisplayComponent', () => {
  let component: BookModifyDisplayComponent;
  let fixture: ComponentFixture<BookModifyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookModifyDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookModifyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
