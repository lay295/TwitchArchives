import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadChannelsComponent } from './download-channels.component';

describe('DownloadChannelsComponent', () => {
  let component: DownloadChannelsComponent;
  let fixture: ComponentFixture<DownloadChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
