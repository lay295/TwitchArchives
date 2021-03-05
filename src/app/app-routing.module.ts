import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ChannelsComponent } from './channels/channels.component';
import { ContactComponent } from './contact/contact.component';
import { DeletedVodsComponent } from './deleted-vods/deleted-vods.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'channel', redirectTo: ''},
  { path: 'channel/:name', component: ChannelsComponent },
  { path: 'video', redirectTo: ''},
  { path: 'video/:id', component: VideosComponent },
  { path: 'deleted-vods', component: DeletedVodsComponent },
  { path: 'channel/:name/game/:game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
