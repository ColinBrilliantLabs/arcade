import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  public isLoggedIn = false;
  public userObservable: BehaviorSubject<any>;
  public user = {auth: null, data: null};

  constructor(public auth: AngularFireAuth, public  db: AngularFirestore) {
    //auth.createUserWithEmailAndPassword("test@hotmail.com","testtest");
    this.userObservable = new BehaviorSubject(null);
    this.updateUserState();
  }

  updateUserState(){
    this.auth.onAuthStateChanged(auth=>{
      //If user signed in
      if (auth != null){
        console.log("logged in");
        this.user.auth = auth;
        this.isLoggedIn = true;
        this.getUserFromEmail(auth.email).then(userData=>{
          this.user.data = userData;
          console.log(this.user);
          //Alert the rest of the website that our user info has been updated
          this.userObservable.next(this.user.data);
        })
      }
      //If user is signed out
      else{
        this.user.auth = null;
        this.user.data = null;
        this.isLoggedIn = false;
        console.log("logged out");
        this.userObservable.next(null);
      }
      console.log("auth data has changed!");
    })
  }

  public sendForgotPasswordEmail(email){
    return new Promise((resolve,reject)=>{
      this.auth.sendPasswordResetEmail(email).then(()=>{
        resolve(true);
      })
    })
  }

  public logout(){
    this.auth.signOut();
  }
  
  public getUserFromEmail(email){
    return new Promise((resolve,reject)=>{
      this.db.collection("users",ref => ref.where("email","==",email)).get().forEach(usersList=>{
        usersList.forEach(user=>{
          resolve(user.data());
        })
      })
    })
  }

  public createUser(email,password,nickname){
    //Create a promise
    return new Promise((resolve,reject) => {

      //Check if the nickname was taken
      this.checkIfNicknameIsTaken(nickname).then(isTaken=>{
        //If nickname was taken, reject the promise
        if (isTaken == true){
          reject("This nickname has already been taken!");
        }
        //If nickname wasn't taken, continue
        else{
          //Make new auth user
          this.auth.createUserWithEmailAndPassword(email,password).then(userAuthData=>{
            //create user in our cloud firestore database
            let user = {id: userAuthData.user.uid, email: email, nickname: nickname};
            this.db.collection("users").doc(user.id).set(user).then(userData=>{
              //Tell our modal that we are done creating our user
              resolve(userData);
            })
            .catch(error=>{
              reject(error);
            })
          }).catch(error=>{
            reject(error.message);
          })
        }
      })

      
    })
  }

  public login(email,password){
    return new Promise((resolve,reject)=>{
      this.auth.signInWithEmailAndPassword(email,password).then(()=>{
        resolve();
      }).catch(error=>{
        console.log(error);
      })
      
    })
  }

  public checkIfNicknameIsTaken(nickname){
    return new Promise((resolve,reject)=>{
      this.db.collection("users",ref => ref.where("nickname", "==", nickname)).get().forEach(usersList=>{
        //If no users have been returned, then the nickname has not been taken. Return false
        if (usersList.size == 0){
          resolve(false);
        }
        //If users have been returned, then the nickname has been taken. Return true
        else {
          resolve(true);
        }
      })
    })
  }
}
