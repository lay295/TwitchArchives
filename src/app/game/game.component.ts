import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  videos = [];
  breakpoint = 5;
  channel_name;
  game_name;
  channel_data;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.channel_name = this.route.snapshot.params['name'];
    this.game_name = this.route.snapshot.params['game'];

    this.dataService.getChannels().subscribe((data: any[]) => {
      data.forEach(currentChannel => {
        if (currentChannel.name.toLowerCase() === this.channel_name.toLowerCase()) {
          this.channel_data = currentChannel;
          console.log(currentChannel);
        }
      });
    });

    this.dataService.getVideoByGame(this.channel_name, this.game_name, 50, 0).subscribe((data: any[]) => {
      this.videos = data;
    });

    this.setBreakpoint();
  }

  onPageChange(event) {
    this.videos = [];
    this.dataService.getVideoByGame(this.channel_name, this.game_name, event.pageSize, event.pageIndex * event.pageSize).subscribe((data: any[]) => {
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
