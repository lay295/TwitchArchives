import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channel_name;
  channel_data;
  videos = [];
  breakpoint = 5;
  
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.channel_name = this.route.snapshot.params['name'];

    this.dataService.getChannels().subscribe((data: any[]) => {
      data.forEach(currentChannel => {
        if (currentChannel.name === this.channel_name) {
          this.channel_data = currentChannel;
          console.log(currentChannel);
        }
      });
    });

    this.dataService.getVideo(this.channel_name, 50, 0).subscribe((data: any[]) => {
      this.videos = data;
    });

    this.setBreakpoint();
  }

  onPageChange(event) {
    this.videos = [];
    this.dataService.getVideo(this.channel_name, event.pageSize, event.pageIndex * event.pageSize).subscribe((data: any[]) => {
      this.videos = data;
    });
  }

  onResize(event) {
    this.setBreakpoint();
  }

  setBreakpoint()
  {
    this.breakpoint = window.innerWidth / 400;
  }
}