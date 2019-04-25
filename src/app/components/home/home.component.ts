import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../providers/logger.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loggerService:LoggerService) { }

  ngOnInit() {
    this.loggerService.logs.push("home component initialized");
  }

}
