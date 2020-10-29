import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedVodsComponent } from './deleted-vods.component';

describe('DeletedVodsComponent', () => {
  let component: DeletedVodsComponent;
  let fixture: ComponentFixture<DeletedVodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedVodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedVodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
