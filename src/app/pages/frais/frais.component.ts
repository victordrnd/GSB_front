import { Component, OnInit } from '@angular/core';
import { FraisService } from 'src/app/core/services/frais.service';
import { StatusService } from 'src/app/core/services/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.scss']
})
export class FraisComponent implements OnInit {
  listFrais;
  statuses
  constructor(private fraisService: FraisService,
    private router: Router) { }

  filters = {
    type_id : null,
    dateRange : [],
    user_id : null,
    order_by : null
  }
  async ngOnInit() {
    this.getFrais();
  }

  async getFrais() {
    this.listFrais = await this.fraisService.getAll(this.filters).toPromise();
  }

  getAvatarLetter(item) {
    return item.user.firstname.substring(0, 1) + item.user.lastname.substring(0, 1)
  }

  showFrais(id) {
    this.router.navigate([`frais/${id}`]);
  }


}
