import { Component, OnInit, NgZone } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';
import { LoggerService } from '../../providers/logger.service';
import { NodeComponent } from '../node/node.component';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

@Component({
  selector: 'app-copydeck-editor',
  templateUrl: './copydeck-editor.component.html',
  styleUrls: ['./copydeck-editor.component.scss']
})
export class CopydeckEditorComponent implements OnInit {
  public projectName:string = "Add new project";
  public cdeNodes:any = [];
  public currentCdeNodeIndex:number = 0;
  public currentCdeNode:object;
  constructor(private electronService:ElectronService, private zone:NgZone, private loggerService: LoggerService) { }

  ngOnInit() {
    this.loggerService.logs.push("copydeck-editor component initialized");
    this.electronService.on("selectedFiles",(event, files)=>{
      this.loggerService.logs.push("selectedFiles message received from electron");
      this.createCopydeckNodes(files);
    })
  }
  public openDirectory() {
    this.loggerService.logs.push("get files message sent to electron");
    this.electronService.send("getFiles");
  }

  private createCopydeckNodes(files){ // called after adding images by menu
    this.loggerService.logs.push("createCopydeckNodes method start");
    if(!files.length) {
      alert("Please add valid files only.");
      return;
    }
    files.forEach( ( file ) => {
      let fileData = path.parse(file);
      let fullpath = path.join(fileData.dir,fileData.name+fileData.ext);
      this.zone.run( ()=> {
        this.cdeNodes.push({
          name:fileData.name+fileData.ext,
          path:fileData.dir,
          fullpath:fullpath
        })
      });
    });
    this.zone.run( ()=> {
      this.projectName = this.cdeNodes[0].path;
    });
    this.loggerService.logs.push("createCopydeckNodes method end");
  }

  public openFile(index) {
    this.loggerService.logs.push("openFile method start");
    this.currentCdeNodeIndex = index;
    console.log("openFile");
    try {
      this.currentCdeNode = yaml.safeLoad(fs.readFileSync(this.cdeNodes[index].fullpath, 'utf8'));
      console.log(this.currentCdeNode);
    } catch (e) {
      console.log(e);
    }
    this.loggerService.logs.push("openFile method end");
  }
  
}
