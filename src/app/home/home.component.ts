import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  channels = [];
  breakpoint = 8;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getChannels().subscribe((data: any[]) => {
      this.channels = data;
    });

    this.setBreakpoint();
  }
  onResize(event) {
    this.setBreakpoint();
  }

  setBreakpoint()
  {
    this.breakpoint = window.innerWidth / 280;
  }
}
