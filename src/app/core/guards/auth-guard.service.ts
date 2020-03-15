import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: UserService, private notificationService : NzNotificationService) { }

  async canActivate() {
    try {
      const result = await this.userService.populate();
      if (!result) {
        this.notificationService.warning("Erreur authentification", "Cet espace n'est accessible qu'une fois authentifié")
        this.router.navigate(['']);
      }
      return result;
    } catch (error) {

    }
  }
}