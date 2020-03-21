import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzContextMenuService } from 'ng-zorro-antd';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public router : Router,
    private dropDownService : NzContextMenuService,
    private authService : UserService) { }
  @ViewChild('menu', null) menu
  ngOnInit() {
  }


  isAuthRoute(){
    return this.router.url == '/' || this.router.url == '/signup' ? true : false;
  }


  logout(){
    this.authService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
