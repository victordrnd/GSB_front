import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private activityService : ActivityService) { }

  activities;
  async ngOnInit() {
    this.activities = await this.activityService.getAll().toPromise();
    console.log(this.activities);
  }

}
