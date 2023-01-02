import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModifyComponent } from './book-modify.component';

describe('BookModifyComponent', () => {
  let component: BookModifyComponent;
  let fixture: ComponentFixture<BookModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
