import { Component } from '@angular/core';
import { AuthService } from '../../SERVICES/auth.service';
import { User } from '../../SERVICES/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userData: User | undefined;


  constructor(private auth: AuthService) {
    const encryptedUserData = localStorage.getItem("encryptedUserData");
    if (encryptedUserData) {
      const userEnc = atob(encryptedUserData!);
      this.userData = JSON.parse(userEnc!);
      console.log(this.userData)
    }
  }
  fnSignOut() {
    this.auth.SignOut();
  }

}
