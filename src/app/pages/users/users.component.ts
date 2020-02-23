import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private utilisateurService : UtilisateurService,
    private router : Router) { }

  users : Array<any>;
  async ngOnInit() {
    this.users = await this.utilisateurService.getAllUsers().toPromise();
    console.log(this.users);
  }


  getAvatarLetter(user){
    return (user.firstname.substring(0,1) + user.lastname.substring(0,1)).toUpperCase()
  }


  showDetails(user){
    //TODO check for permission 
    this.router.navigate([`users/${user.id}`]);
  }
}
