import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route : ActivatedRoute,
    private userService : UtilisateurService,
    private modalService : NzModalService,
    private notificationService : NzNotificationService,
    private router : Router) { }

  user;
  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.user = await this.userService.getUser(id).toPromise();
  }

  getAvatarLetter(){
    return (this.user.firstname.substring(0,1) + this.user.lastname.substring(0,1)).toUpperCase();
  }

  editUser(){
    const modalRef = this.modalService.create({
      nzTitle : this.user.fullname +' - Edition',
      nzWidth: 800,
      nzContent : UserEditComponent,
      nzComponentParams : {user : this.user},
      nzFooter : null
    });
    modalRef.afterClose.subscribe(async event => {
      this.user = await this.userService.getUser(this.user.id).toPromise();
    })
  }


  deleteUser(){
    this.userService.delete(this.user).toPromise();
    this.notificationService.success("Supprimé", "L'utilisateur a été supprimé");
    this.router.navigate(['users']);
  }

}
