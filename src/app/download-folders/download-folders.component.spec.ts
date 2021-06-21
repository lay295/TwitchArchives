import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFoldersComponent } from './download-folders.component';

describe('DownloadFoldersComponent', () => {
  let component: DownloadFoldersComponent;
  let fixture: ComponentFixture<DownloadFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
