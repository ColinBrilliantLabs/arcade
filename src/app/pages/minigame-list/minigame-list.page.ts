import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Minigame, MinigameService } from 'src/app/services/minigame-service.service';
import { RouteDataService } from 'src/app/services/route-data.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-minigame-list',
  templateUrl: './minigame-list.page.html',
  styleUrls: ['./minigame-list.page.scss'],
})
export class MinigameListPage implements OnInit {

  constructor(userAuth: UserAuthService, public minigameService: MinigameService, public routeDataService: RouteDataService
    ,private router: Router) { }

  minigames: Minigame[] = [];

  ngOnInit() {
    this.minigameService.getMinigames().then(minigamesList=>{
      this.minigames = <Minigame[]>minigamesList;
      console.log(this.minigames);
    })
  }

  loadGame(minigame){
    console.log(minigame);
    this.routeDataService.setData(minigame);
    this.router.navigate(['/minigame-player']);

  }

}
