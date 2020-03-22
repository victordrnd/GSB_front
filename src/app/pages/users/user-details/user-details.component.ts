import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { PdfService } from 'src/app/core/services/pdf.service';

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
    private router : Router,
    private pdfService : PdfService) { }

  user;
  exportFrais = {
    dateRange : []
  } 
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


  onDateRangeChange(value) {
    this.exportFrais.dateRange = value.length ? value.map(date => {
      const t = new Date(date)
      let month = (t.getMonth()+1)
      // Add 0 to month if 2 and add nothing if 11 for example
      return t.getFullYear() + "-" + ('0' + month).slice(-2)  + "-" + ('0' + t.getDate()).slice(-2);
    }) : null;
    console.log(this.exportFrais.dateRange);
  }

  export(){
    this.pdfService.export(this.exportFrais.dateRange[0], this.exportFrais.dateRange[1], this.user);
  }
}
