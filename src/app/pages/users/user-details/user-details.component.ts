import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route : ActivatedRoute,
    private userService : UtilisateurService) { }

  user;
  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.user = await this.userService.getUser(id).toPromise();
    console.log(this.user);
  }

  getAvatarLetter(){
    return (this.user.firstname.substring(0,1) + this.user.lastname.substring(0,1)).toUpperCase();
  }

}
