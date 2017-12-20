import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public errorMsg = '';
  public succMsg = '';
  public user: User = new User();

  constructor(private _service: UserService) { }

  ngOnInit() {
  }

  signup() {
    this._service.signup(this.user)
    .subscribe(data => {
      this.succMsg = 'Sign up successful';
      console.log(data);
    }, error => {
      this.errorMsg = error;
    });
  }

}
