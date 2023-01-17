import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm:FormGroup;
  constructor(private router:Router, private fb:FormBuilder) {
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

    this.redirect('home');
  }

  verifyErrors():boolean {
    return this.inscriptionForm.hasError('requiredUsername') ||
      this.inscriptionForm.hasError('requiredEmail') ||
      this.inscriptionForm.hasError('requiredPassword');
  }

  redirect(page:String):void {
    this.router.navigate(['/'+page]);
    return;
  }

  ngOnInit(): void {
  }

}
