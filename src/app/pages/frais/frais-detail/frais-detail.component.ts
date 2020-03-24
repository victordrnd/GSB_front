import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FraisService } from 'src/app/core/services/frais.service';
import { StatusService } from 'src/app/core/services/status.service';
import { NzNotificationService } from 'ng-zorro-antd';
import {environment} from "../../../../environments/environment";
import Viewer from 'viewerjs';
@Component({
  selector: 'app-frais-detail',
  templateUrl: './frais-detail.component.html',
  styleUrls: ['./frais-detail.component.scss']
})
export class FraisDetailComponent implements OnInit {
  @ViewChild('img', null) image;
  constructor(private route : ActivatedRoute,
    private fraisService:  FraisService,
    private statusService : StatusService,
    private notificationService : NzNotificationService) { }


  environement = environment;
  frais;
  status;


  async ngOnInit() {
    this.route.params.subscribe(async value => {
      this.frais = await this.fraisService.findById(value.id).toPromise();
    });
    this.status = await this.statusService.getAll().toPromise();
    
  }

  getAvatarLetter(item) {
    if(item)
      return item.user.firstname.substring(0, 1) + item.user.lastname.substring(0, 1)
  }


  async onSubmit(){
    this.frais = await this.fraisService.update(this.frais).toPromise();
    this.notificationService.success("Succès", "Le statut du frais a été modifié")
  }

  openImage(){
    const viewer = new Viewer(document.getElementById('image'),  {
      inline: true,  
      viewed() {
        viewer.zoomTo(0.5);
      },
    });
  }

}
  