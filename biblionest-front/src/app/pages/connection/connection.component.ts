import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  connectionForm:FormGroup;
  constructor(public commonService:CommonService, private fb:FormBuilder) {
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

    this.commonService.navigate('home');
  }

  verifyErrors():boolean {
    return this.connectionForm.hasError('requiredUsername') ||
      this.connectionForm.hasError('requiredEmail') ||
      this.connectionForm.hasError('requiredPassword');
  }

  ngOnInit() {
  }
}
