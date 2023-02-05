import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm:FormGroup;
  constructor(public commonService:CommonService, private fb:FormBuilder) {
    this.inscriptionForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  inscription():void {
    const user = this.inscriptionForm.value;

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

    this.commonService.navigate('home');
  }

  verifyErrors():boolean {
    return this.inscriptionForm.hasError('requiredUsername') ||
      this.inscriptionForm.hasError('requiredEmail') ||
      this.inscriptionForm.hasError('requiredPassword');
  }

  ngOnInit(): void {
  }

}
