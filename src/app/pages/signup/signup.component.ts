import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private userService : UserService,
    private router : Router,
    private notificationService : NzNotificationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      lastname : [null, Validators.required],
      firstname : [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  onSubmit(){
    this.userService.addUser(this.form.value).subscribe((res) => {
      this.router.navigate(['/dashboard'])
    },
      err => this.notificationService.error("Une erreur s'est produite", "Un des champs est invalide."))

  }
}
