import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Minigame {
  id: string;
  icon: string;
  name: string;
  scores: Score[];
}

export interface Score {
  date: any;
  nickname: string;
  email: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class MinigameService {

  private minigamesCollection: AngularFirestoreCollection<Minigame>;
  private db: AngularFirestore;


  constructor(db: AngularFirestore) { 
    this.db = db;
    this.minigamesCollection = db.collection<Minigame>("minigames",ref =>ref);
  }

  getMinigames(){
    return new Promise((resolve,reject)=>{
      let minigames: Minigame[] = [];
      this.minigamesCollection.get().forEach(minigameList=>{
        minigameList.forEach(minigameData=>{
          let minigame = <Minigame>minigameData.data();
          minigames.push(minigame);
        })
        resolve(minigames);
      })
    })
  }

  public getPersonalScore(scores,email){
    let score = 0;
    for (let i = 0; i < scores.length; i++){
      if (scores[i].email == email && scores[i].score > score){
        score = scores[i].score;
      }
    }
    return score;
  }
  
  public convertScoresToJSON(highscores: Score[], currentNickname){
    //"{\"names\":[\"Colin1\",\"Colin2\"],\"scores\":[1,20]}";
    //Sort array = scores desc
    highscores = highscores.sort((a, b) => (a.score < b.score) ? 1 : -1)

   var names = [];
   var scores = [];
   //limit = amount of top scores to grab
   var limit = highscores.length <= 10 ? highscores.length : 10;
   for (let i = 0; i < limit; i++){
     if (highscores[i].nickname != currentNickname){
       names.push(highscores[i].nickname);
       scores.push(highscores[i].score);
     }
     
   }
   var scoreString = "{\"names\":[";
   for (let i = 0; i < names.length; i++){
     scoreString += "\"" + names[i] + "\"";
     if (i != names.length - 1){
       scoreString += ",";
     }
   }
   scoreString += "],\"scores\":[";
   for (let i = 0; i < scores.length; i++){
     scoreString += scores[i];
     if (i != scores.length - 1){
       scoreString += ",";
     }
   }
   scoreString += "]}";
   return scoreString;
 }

 updateHighScore(minigame,newScore,user){
   let scores = minigame.scores;
   let firstScore = true;
   let updateOldScore = false;

   for (let i = 0; i < scores.length; i++){
     if (scores[i].email == user.email){
       firstScore = false;
       if (scores[i].score < newScore){
         scores[i].score = newScore;
         scores[i].date = Date.now();
         updateOldScore = true;
       }
     }
   }

   if (firstScore == true){
     let score = {
       email: user.email,
       date: Date.now(),
       nickname: user.nickname,
       score: newScore
     }
     scores.push(score);
   }

   if (firstScore == true || updateOldScore == true){
     this.updateMinigame(minigame);
   }
 }

 updateMinigame(minigame){
   return this.minigamesCollection.doc(minigame.id).set(minigame);
 }
}
