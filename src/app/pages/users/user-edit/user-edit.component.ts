import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: any;

  constructor(private userFB : FormBuilder, private userService : UtilisateurService,
    private notificationService : NzNotificationService,
    private modalService : NzModalService,
    private roleService : RoleService) { }
  @Input() user;


  roles;
  async ngOnInit() {
    this.userForm = this.userFB.group({
			firstname: [this.user.firstname, Validators.required],
			lastname: [this.user.lastname, Validators.required],
			email: [{value : this.user.email, disabled : true}, Validators.email],
			phone: [this.user.phone, Validators.required],
			role: [this.user.role.id, Validators.required],
		});
    this.roles = await this.roleService.getAllRoles().toPromise();

  }


  async submit(){
    const controls = this.userForm.controls;
    let newUser = {
      id : this.user.id,
			firstname: controls.firstname.value,
      lastname: controls.lastname.value,
      email: controls.email.value,
			phone: controls.phone.value,
			role_id: controls.role.value,
    } 
    await this.userService.update(newUser).toPromise();
    this.notificationService.success("Mis à jour", "L'utilisateur a correctement été mis à jour");
    this.modalService.openModals[0].close();
  }

  get lastname() {
		return this.userForm.get("lastname");
	}

	get firstname() {
		return this.userForm.get('firstname');
	}

	get email() {
		return this.userForm.get("email");
	}

	get phone() {
		return this.userForm.get("phone");
	}

	get role() {
		return this.userForm.get("role");
	}



}
