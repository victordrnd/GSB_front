import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NzNotificationService,
    private messagingService: NotificationService,
    private ngZone: NgZone) { }

  ngOnInit() {
    if(this.userService.populate()){
      this.router.navigate(['dashboard']);
    };
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  async onSubmit() {
    this.messagingService.requestPermission().subscribe(token => {
      let obj = {
        ...this.form.value,
        web_fcm_token: token
      }
      this.userService.attemptAuth(obj).subscribe((res) => {
        this.messagingService.receiveMessage();
        if (res.user.role.niveau > 1) {
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
        } else {
          this.userService.purgeAuth();
          this.notificationService.error('Accès réservé', "Vous n'avez pas accès à cet espace d'administration");
        }
        //this.redirectToDashBoard();
      },
        err => this.notificationService.error("Identifiants incorrects", "Les identifiants saisis ne correspondent à aucun compte.")
      )
    }, err => {
      this.userService.attemptAuth(this.form.value).subscribe((res) => {
        this.messagingService.receiveMessage();
        if (res.user.role.niveau > 1) {
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
        } else {
          this.userService.purgeAuth();
          this.notificationService.error('Accès réservé', "Vous n'avez pas accès à cet espace d'administration");
        }

        //this.redirectToDashBoard();
      },
        err => this.notificationService.error("Identifiants incorrects", "Les identifiants saisis ne correspondent à aucun compte."))
    })
  }

  redirectToDashBoard() {

  }
}
