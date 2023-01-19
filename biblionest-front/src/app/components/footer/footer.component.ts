import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { CommonService } from 'src/app/service/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faGithub = faGithub;
  faCopyright = faCopyright;
  year: number = moment().year();

  constructor(private Router: Router, protected common: CommonService) { }

  ngOnInit(): void { }
}
