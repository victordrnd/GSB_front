import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { FraisService } from 'src/app/core/services/frais.service';

@Component({
  selector: 'app-frais-filter',
  templateUrl: './frais-filter.component.html',
  styleUrls: ['./frais-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FraisFilterComponent),
    multi: true
  }]

})
export class FraisFilterComponent implements OnInit {
  filters: any = {
    user_id : null,
    dateRange : [],
    type_id : null
  };
  users;
  types;
  constructor(private utilisateurService : UtilisateurService,
   private fraisService : FraisService) { }
  @Output() change = new EventEmitter();
  
  async ngOnInit() {
    this.users = await this.utilisateurService.getAllUsers({}).toPromise();
    this.types = await this.fraisService.getAllType().toPromise();

  }


  submit() {
    this.change.emit(this.filters);
  }

  onChange: (_: any) => void = (_: any) => { };


  onTouched: () => void = () => { };




  writeValue(value): void {
    if (value) {
      this.filters = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  get value(): any {
    return this.filters;
  }

  onDateRangeChange(value) {
    this.filters.dateRange = value.length ? value.map(date => {
      const t = new Date(date)
      let month = (t.getMonth()+1)
      // Add 0 to month if 2 and add nothing if 11 for example
      return t.getFullYear() + "-" + ('0' + month).slice(-2)  + "-" + t.getDate() + " 00:00:00"
    }) : null;
    this.submit();
  }

}
