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
    console.log(this.activities);
  }
}
