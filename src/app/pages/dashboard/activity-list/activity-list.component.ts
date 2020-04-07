import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit, OnDestroy {

  constructor(private activityService : ActivityService,
    private router : Router,
    private socketService : SocketService) { }

  activities;
  _fraisSub;
  ngOnInit() {
    this.getData();
    this._fraisSub = this.socketService.newFraisEvent.subscribe(ev => {
      this.getData();
    })
  }


  async getData(){
    this.activities = await this.activityService.getAll().toPromise();
  }



  getAvatarLetter(item){
    if(item.causer && item.subject_type == 'frais'){
      return item.causer.firstname.substring(0,1) + item.causer.lastname.substring(0,1)
    }else{
      return item.subject.firstname.substring(0,1) + item.subject.lastname.substring(0,1)
    }
  }

  goToFrais(_id){
    this.router.navigate([`frais/${_id}`]);
  }
  
  goToUser(id){
    this.router.navigate([`users/${id}`]);
  }

  ngOnDestroy(){
    this._fraisSub.unsubscribe();
  }
}
