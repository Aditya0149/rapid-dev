import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { LoggerService } from './providers/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showLogs = true;
  public navLinks:any = [
    {name:'Home',path:''},
    {name:'Copydeck Document',path:'/copydeck'}
  ]
  constructor(public electronService: ElectronService,
    private translate: TranslateService, public loggerService:LoggerService) {
    translate.setDefaultLang('en');
    if (electronService.isElectron()) {
      this.loggerService.logs.push("Mode - electron");
    } else {
      this.loggerService.logs.push("Mode - web");
    }
  }
  ngOnInit() {
    this.loggerService.logs.push("App component initialized");
  }
}
