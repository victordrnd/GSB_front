import { Component, OnInit } from '@angular/core';
import { FraisService } from 'src/app/core/services/frais.service';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.scss']
})
export class FraisComponent implements OnInit {
  listFrais;
  constructor(private fraisService : FraisService) { }

  async ngOnInit() {
    this.listFrais = await this.fraisService.getAll().toPromise();
  }

}
