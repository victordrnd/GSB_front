import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  constructor(private activityService : ActivityService,
    private router : Router) { }

  activities;
  async ngOnInit() {
    this.activities = await this.activityService.getAll().toPromise();
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
