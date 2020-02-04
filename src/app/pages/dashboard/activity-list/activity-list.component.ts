import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  constructor(private activityService : ActivityService) { }

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
}
