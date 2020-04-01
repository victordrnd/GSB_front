import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/role.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private roleService : RoleService,
    private notificationService : NzNotificationService) { }
  roles : Array<any>;
  
  
  async ngOnInit() {
    this.roles = await this.roleService.getAllRoles().toPromise();
    console.log(this.roles);
  }


  async saveChanges(event, role_id){
    console.log(event);

    if(event.from == "left"){
      await this.roleService.addPermissions(role_id, event.list).toPromise();
    }else{
      await this.roleService.removePermissions(role_id, event.list).toPromise();
    }
    this.notificationService.info('Succès', "Les permissions ont été mises à jour");
  }
}
