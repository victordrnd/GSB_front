import { Component, OnInit } from '@angular/core';
import { FraisService } from 'src/app/core/services/frais.service';
import { StatusService } from 'src/app/core/services/status.service';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.scss']
})
export class FraisComponent implements OnInit {
  listFrais;
  statuses
  constructor(private fraisService : FraisService,
    private statusService : StatusService) { }

  async ngOnInit() {
    this.listFrais = await this.fraisService.getAll().toPromise();
    this.statuses = await this.statusService.getAll().toPromise();
  }

}
