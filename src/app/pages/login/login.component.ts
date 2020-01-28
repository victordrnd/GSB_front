import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  constructor(private fb: FormBuilder,
    private userService : UserService,
    private router : Router,
    private notificationService : NzNotificationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  onSubmit(){
    this.userService.attemptAuth(this.form.value).subscribe((res) => {
      this.router.navigate(['/dashboard'])
    },
      err => this.notificationService.error("Identifiants incorrects", "Les identifiants saisis ne correspondent à aucun compte."))

  }
}
