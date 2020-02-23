import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-activity-list',
  templateUrl: './user-activity-list.component.html',
  styleUrls: ['./user-activity-list.component.scss']
})
export class UserActivityListComponent implements OnInit {

  
  constructor(private router : Router) { }


  @Input() activities;
  ngOnInit() {
    console.log(this.activities)
  }




  getAvatarLetter(item){
    if(item.causer){
      return item.causer.firstname.substring(0,1) + item.causer.lastname.substring(0,1)
    }else{
      return item.subject.firstname.substring(0,1) + item.subject.lastname.substring(0,1)
    }
  }

  goToFrais(_id){
    this.router.navigate([`frais/${_id}`]);
  }
  

}
