import { Component, OnInit } from '@angular/core';
import { SpinService } from 'src/app/core/services/spin.service';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent implements OnInit {

  constructor(private spinService : SpinService) { }

  loading : boolean;
  ngOnInit() {
    this.spinService.loading.subscribe(state => {
      this.loading = state;
    })
  }

}
