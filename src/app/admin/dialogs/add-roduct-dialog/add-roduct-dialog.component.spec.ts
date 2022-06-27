import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoductDialogComponent } from './add-roduct-dialog.component';

describe('AddRoductDialogComponent', () => {
  let component: AddRoductDialogComponent;
  let fixture: ComponentFixture<AddRoductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
