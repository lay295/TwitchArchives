import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  video_id: number;
  video_data;
  channel_data;
  video_list = [];
  chat_list = [];
  Url;
  ChatUrl;
  first_load;
  disable_sync = false;
  selected_option;

  YT;
  player_video;
  player_chat;
  count;

  constructor(private route: ActivatedRoute, private dataService: DataService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.video_id = this.route.snapshot.params['id'];
    this.first_load = true;

    this.dataService.getVideoById(this.video_id).subscribe((data: any[]) => {
      this.video_data = data[0];
      this.selected_option = 1;
      if (this.video_data.video_youtube_id != null)
        this.video_list = this.video_data.video_youtube_id.split(",");
      console.log(this.video_list);
      if (this.video_data.chat_youtube_id != null)
        this.chat_list = this.video_data.chat_youtube_id.split(",");
      console.log(this.chat_list);
      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video_list[0] + "?enablejsapi=1&rel=0");
      this.ChatUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.chat_list[0] + "?enablejsapi=1&rel=0");
      this.dataService.getChannels().subscribe((data: any[]) => {
        console.log(data);
        console.log(this.video_data);
        data.forEach(currentChannel => {
          if (currentChannel.name.toLowerCase() === this.video_data.channel_name.toLowerCase()) {
            this.channel_data = currentChannel;
          }
        });
      });

      if (window['YT'] == undefined) {
        this.init();
      }
      else {
        setTimeout(() => this.onYouTubeIframeAPIReady(), 1000);
      }

      window['onYouTubeIframeAPIReady'] = () => this.onYouTubeIframeAPIReady();
    });
  }

  onSelectChange(event) {
    try {
      this.player_video.loadVideoById(this.video_list[this.selected_option-1], 0);
    } catch { }
    try {
      this.player_chat.loadVideoById(this.chat_list[this.selected_option-1], 0);
    } catch { }
  }

  checkChanged(event: any) {
    this.disable_sync = event.checked;
  }

  onYouTubeIframeAPIReady() {
    console.log("API Ready");
    this.YT = window['YT'];

    this.player_video = new window['YT'].Player('yt_video', {
      videoId: this.video_data.video_youtube_id,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });

    this.player_chat = new window['YT'].Player('yt_chat', {
      videoId: this.video_data.video_youtube_id,
      events: {
        'onStateChange': this.onPlayerStateChangeChat.bind(this)
      }
    });
  }

  onPlayerStateChangeChat(event) {
    if (this.disable_sync)
      return;
    if (event.data == this.YT.PlayerState.PLAYING) {
      if (this.first_load) {
        this.first_load = false;
        this.player_chat.seekTo(this.player_video.getCurrentTime());
      }
    }
  }

  onPlayerStateChange(event) {
    console.log(event.data);
    if (this.disable_sync)
      return;

    if (event.data == this.YT.PlayerState.PLAYING) {
      this.player_chat.playVideo();
      if (this.player_chat != null) {
        if (Math.abs(this.player_video.getCurrentTime() - this.player_chat.getCurrentTime()) > 5) {
          this.player_chat.seekTo(this.player_video.getCurrentTime());
        }
      }
    }
    if (event.data == this.YT.PlayerState.PAUSED) {
      if (this.player_video.getPlayerState() == this.YT.PlayerState.PAUSED && this.player_chat != null) {
        this.player_chat.pauseVideo();
      }
    }
  }

  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}
