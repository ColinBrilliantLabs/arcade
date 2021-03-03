import { Component, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Minigame, MinigameService } from 'src/app/services/minigame-service.service';
import { RouteDataService } from 'src/app/services/route-data.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
declare var UnityLoader: any;

@Component({
  selector: 'app-minigame-player',
  templateUrl: './minigame-player.page.html',
  styleUrls: ['./minigame-player.page.scss'],
})
export class MinigamePlayerPage implements OnInit {

  minigame: Minigame;
  unityInstance;
  gameLoaded = false;
  hasFocus = false;
  highscores = "";

  user;


  bestCurrentScore = 0;

  constructor(public routeDataService: RouteDataService, private renderer: Renderer2, public ngZone: NgZone,
    public minigameService: MinigameService, private userAuthService: UserAuthService) {

    //Makes game only operate when it's focused
    this.renderer.listen('window', 'click',(e:Event)=>{

      if (this.unityInstance){
        var target = e.target || e.srcElement || e.currentTarget;
        let id = "";
        if (target["attributes"]["id"] != null){
          id = target["attributes"]["id"]["nodeValue"];
          console.log(id);
        }
        if (id == "#canvas"){
          //Clicked Unity
          this.unityInstance.SendMessage('AppManager', 'SetKeyboard', "true");

          console.log("clicked inside");

        }
        else{
          //Clicked out of Unity
          this.unityInstance.SendMessage('AppManager', 'SetKeyboard', "false");

          console.log("clicked outside");


        }
      }


    });

  }

  calledSetup = false;
  firstUserCheck = true;
  ngOnInit() {

    if (this.routeDataService.getData() != null){
      this.setup();
      this.calledSetup = true;
    }

    this.userAuthService.userObservable.subscribe((userData)=>{
      this.user = userData;

      if (this.firstUserCheck == true){
        this.firstUserCheck = false;
      }
      else if (this.calledSetup == false ){
        this.calledSetup = true;
        this.setup();
      }
    });

    
  }

  getMinigame(){
    return new Promise((resolve,reject)=>{
      this.minigame = this.routeDataService.getData();
      console.log("our minigame",this.minigame);

      //If minigame does not equal null, then set our local storage to hold it for when we refresh
      if (this.minigame != null && this.minigame != undefined){
        localStorage.removeItem('LastMinigame');
        localStorage.setItem('LastMinigame', JSON.stringify(this.minigame));
        resolve(this.minigame);
      }
      //We have refreshed the page grab our minigame from local storage
      else{
        //Local storage does not contain our game, redirect user back to minigame page
        if (localStorage.getItem("LastMinigame") === null) {
          //Change our page back to the main page
        }
        //Local storage does contain our game, set our minigame
        else{
          this.minigame = JSON.parse(localStorage.getItem('LastMinigame'));
          resolve(this.minigame);
        }
      }
    })
  }

  setup(){
    console.log("loading unity");
    this.getMinigame().then(()=>{
      window["my"] = window["my"] || {};
      window["my"].namespace = window["my"].namespace || {};
      window["my"].namespace.GetScore = this.getScore.bind(this);
      window["my"].namespace.ConfirmGameLoaded = this.confirmGameLoaded.bind(this);
  
      let nickname = "";
      if (this.user != null){
        nickname = this.user.nickname;
        this.bestCurrentScore = this.minigameService.getPersonalScore(this.minigame.scores,this.user.email);
      }
  
      this.highscores = this.minigameService.convertScoresToJSON(this.minigame.scores,nickname);
      this.startGame();
    })

    

  }

  getScore(score: number){
      this.ngZone.run(()=>{
        if (this.bestCurrentScore < score){
          this.bestCurrentScore = score;
        }

        if (this.user != null){
          this.minigameService.updateHighScore(this.minigame,score,this.user);
        }
      })
  }

  confirmGameLoaded(){
    this.ngZone.run(()=>{
      this.gameLoaded = true;
      let email = "";
      if (this.user != null){
        email = this.user.email;
      }
      this.unityInstance.SendMessage("GameManager","setScores",this.highscores);
      
      this.unityInstance.SendMessage("GameManager","setPersonalScore",this.bestCurrentScore.toString());
      this.unityInstance.SendMessage("AppManager","SetKeyboard",this.hasFocus.toString());
    })
  }
  startGame(){
    if (this.unityInstance){
      this.stopGame();
    }

    this.unityInstance = UnityLoader.instantiate("unityContainer","assets/unity/" + this.minigame.id + "/Build/Build.json");
  }

  stopGame(){
    this.unityInstance = null;
  }




}
