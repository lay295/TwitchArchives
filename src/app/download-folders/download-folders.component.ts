import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-download-folders',
  templateUrl: './download-folders.component.html',
  styleUrls: ['./download-folders.component.scss']
})
export class DownloadFoldersComponent implements OnInit {
  channel_name;
  folders = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.channel_name = this.route.snapshot.params['name'];
    this.dataService.getDownloadFolders(this.channel_name).subscribe((data: any[]) => {
      this.folders = data;
    });
  }

}
