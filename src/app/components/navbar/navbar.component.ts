import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  user;

  constructor(public modalController: ModalController, public userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userAuthService.userObservable.subscribe((userData)=>{
      this.user = userData;
    });
  
  }

  getLoginButtonText(){
    if (this.user == null){
      return "Login";
    }
    else{
      return "Logout";
    }
  }

  submit(){
    if (this.user == null){
      this.presentModal();
    }
    else{
      this.userAuthService.logout();
    }
  }

  async presentModal(){
    const modal = await this.modalController.create({
      component: ModalLoginComponent,
      cssClass: 'login-modal'
    })

    modal.componentProps = {
      modal: modal
    }

    return await modal.present();
  }

}
