import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  connectionForm:FormGroup;
  constructor(private router:Router, private fb:FormBuilder) {
    this.connectionForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  connection():void {
    const user = this.connectionForm.value;

    if(user.username === ''){
      this.connectionForm.setErrors({ requiredUsername: true });
      return;
    }
    else if(user.email === ''){
      this.connectionForm.setErrors({ requiredEmail: true });
      return;
    }
    else if(user.password === ''){
      this.connectionForm.setErrors({ requiredPassword: true });
      return;
    }

    this.redirect('home');
  }

  verifyErrors():boolean {
    return this.connectionForm.hasError('requiredUsername') ||
      this.connectionForm.hasError('requiredEmail') ||
      this.connectionForm.hasError('requiredPassword');
  }

  redirect(page:String):void {
    this.router.navigate(['/'+page]);
    return;
  }
}
