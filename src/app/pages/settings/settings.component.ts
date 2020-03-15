import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private roleService : RoleService) { }
  roles : Array<any>;
  
  
  async ngOnInit() {
    this.roles = await this.roleService.getAllRoles().toPromise();
    console.log(this.roles);
  }

}
