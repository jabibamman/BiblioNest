import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {CommonService} from "../../service/common.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm:FormGroup;
  constructor(public commonService:CommonService, private userService:UserService, private fb:FormBuilder) {
    this.inscriptionForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  inscription():void {
    const user = this.inscriptionForm.value;
    console.log("user=", user);

    if(user.username === ''){
      this.inscriptionForm.setErrors({ requiredUsername: true });
      return;
    }
    else if(user.email === ''){
      this.inscriptionForm.setErrors({ requiredEmail: true });
      return;
    }
    else if(user.password === ''){
      this.inscriptionForm.setErrors({ requiredPassword: true });
      return;
    }

    this.userService.createUser(user).subscribe(
      (response:any) => {},
      (error:any) => {
        console.error(error);
        if(error.status === 200) {
          console.log(error.error.text);
          localStorage.setItem('token', error.error.text);
          this.commonService.navigate('home');
        }
        this.inscriptionForm.setErrors({ errorInscription: true });
      }
    );
  }

  verifyErrors():boolean {
    return this.inscriptionForm.hasError('requiredUsername') ||
      this.inscriptionForm.hasError('requiredEmail') ||
      this.inscriptionForm.hasError('requiredPassword') ||
      this.inscriptionForm.hasError('errorInscription');
  }

  ngOnInit():void { }
}
