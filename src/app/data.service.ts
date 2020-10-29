import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "https://twitcharchives.com/api";
  data$: Observable<Object>;

  constructor(private httpClient: HttpClient) { 
    this.data$ = this.httpClient.get(this.REST_API_SERVER + "/channels.php").pipe(shareReplay(1));
  }

  public getChannels() {
    return this.data$;
  }

  public getVideo(channelName: string, limit: number, offset: number) {
    return this.httpClient.get(this.REST_API_SERVER + "/videos.php?channel_name=" + channelName + "&offset=" + offset + "&limit=" + limit);
  }

  public getVideoById(id: number) {
    return this.httpClient.get(this.REST_API_SERVER + "/videos.php?id=" + id);
  }

  public sendEmail(form_name: string, form_email: string, form_message: string) {
    return this.httpClient.post("https://twitcharchives.com/api/contact.php", JSON.stringify({name: form_name, email: form_email, message: form_message}));
  }
}
