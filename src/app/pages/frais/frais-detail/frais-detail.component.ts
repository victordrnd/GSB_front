import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FraisService } from 'src/app/core/services/frais.service';

@Component({
  selector: 'app-frais-detail',
  templateUrl: './frais-detail.component.html',
  styleUrls: ['./frais-detail.component.scss']
})
export class FraisDetailComponent implements OnInit {

  constructor(private route : ActivatedRoute,
    private fraisService:  FraisService) { }



  frais;


  async ngOnInit() {
    this.route.params.subscribe(async value => {
      this.frais = await this.fraisService.findById(value.id).toPromise();
      console.log(this.frais);
    });
  }

  getAvatarLetter(item) {
    if(item)
      return item.user.firstname.substring(0, 1) + item.user.lastname.substring(0, 1)
  }

}
