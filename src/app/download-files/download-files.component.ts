import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-download-files',
  templateUrl: './download-files.component.html',
  styleUrls: ['./download-files.component.scss']
})
export class DownloadFilesComponent implements OnInit {
  videoid;
  files = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.videoid = this.route.snapshot.params['videoid'];
    this.dataService.getDownloadFiles(this.videoid).subscribe((data: any[]) => {
      this.files = data;
    });
  }

}
