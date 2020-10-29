import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;

  loading: boolean;

  constructor(private dataService: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  processForm() {
    this.loading = true;
    this.dataService.sendEmail(this.name, this.email, this.message).subscribe((res: Response) => {
      this.loading = false;
      if (res.toString() == "Message has been sent") {
        console.log("message sent correctly");
        this.name = "";
        this.email = "";
        this.message = "";
      }
      this.openSnackBar(res.toString(), "OK");
    });
  }
}
