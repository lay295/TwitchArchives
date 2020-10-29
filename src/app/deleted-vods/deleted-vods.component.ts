import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deleted-vods',
  templateUrl: './deleted-vods.component.html',
  styleUrls: ['./deleted-vods.component.scss']
})
export class DeletedVodsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      processing: true,
      serverSide: true,
      ajax: "https://twitcharchives.com/server_processing.php",
      order: [[ 0, "desc" ]]
    };
  }

}
