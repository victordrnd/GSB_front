import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/core/services/role.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private utilisateurService : UtilisateurService,
    private router : Router,
    private roleService : RoleService,
    private socketService : SocketService,
    private socket : Socket
    ) { }

  filters = {
    keyword : null,
    role_id : null
  }
  roles;
  users : Array<any>;
  activeUserIds = [];
  async ngOnInit() {
    this.getUsers();
    this.roles = await this.roleService.getAllRoles().toPromise()
    this.socket.emit('users.connected', null, (activeUsers) =>  this.activeUserIds = activeUsers);
    this.socketService.activeUsers.subscribe(activeUsers => {
      this.activeUserIds = activeUsers;
      this.getUsers();
    });
  }

  async getUsers(){
    this.users = await this.utilisateurService.getAllUsers(this.filters).toPromise();
  }


  getAvatarLetter(user){
    return (user.firstname.substring(0,1) + user.lastname.substring(0,1)).toUpperCase()
  }


  showDetails(user){
    //TODO check for permission 
    this.router.navigate([`users/${user.id}`]);
  }
}
