import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-download-channels',
  templateUrl: './download-channels.component.html',
  styleUrls: ['./download-channels.component.scss']
})
export class DownloadChannelsComponent implements OnInit {

  channels = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getChannels().subscribe((data: any[]) => {
      this.channels = data;
    });
  }

}
