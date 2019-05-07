import { Component, OnInit, NgZone, Injector, ViewChild, ElementRef } from '@angular/core';
import { createCustomElement,  NgElement, WithProperties } from '@angular/elements';
import { ElectronService } from '../../providers/electron.service';
import { LoggerService } from '../../providers/logger.service';
import { NodeService } from '../../providers/node.service';
import { NodeComponent } from '../node/node.component';
import { NodeData } from "../../types/node-data";

import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  private nodeElement:any;
  public files:any;
  public nodeCopy = "";
  public config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    customClasses: [
      {
        name: "nowrap",
        class: "nowrap",
      },
      {
        name: 'workbrk',
        class: 'workbrk'
      },
      {
        name: "bold",
        class: "bold",
        tag: "h1",
      },
    ]
  }
  constructor(private electronService:ElectronService, private zone:NgZone, private loggerService: LoggerService, private injector:Injector, public nodeService:NodeService) {
    this.nodeElement = createCustomElement(NodeComponent, {injector});
    customElements.define('app-node',this.nodeElement);
    this.loggerService.logs.push("constructred copydeck editor and registered the node web elements");
  }

  ngOnInit() {
    // let files = [
    //   "E:\Rapid Dev\Yaml files\last_file.yml",
    //   "E:\Rapid Dev\Yaml files\first_file.yml",
    //   "E:\Rapid Dev\Yaml files\file_two.yml"
    // ]
    // let fileData;
    // files.forEach( ( file ) => {
    //   fileData = path.parse(file);
    //   this.nodeService.addNode(fileData);
    // });
    this.electronService.on("selectedFiles",(event, files)=>{
      this.loggerService.logs.push("selectedFiles message received from electron");
      this.createCopydeckNodes(files);
    })
    this.loggerService.logs.push("copydeck-editor component initialized");
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
    let fileData;
    files.forEach( ( file ) => {
      fileData = path.parse(file);
      let fullpath = path.join(fileData.dir,fileData.name+fileData.ext);
      this.nodeService.addNode(new NodeData(fileData.name,"url",fullpath,"",fullpath),null);
    });
    this.loggerService.logs.push("All parent nodes created");
    this.zone.run( ()=> {
      this.projectName = path.parse(files[0]).dir;
    });
    this.loggerService.logs.push("createCopydeckNodes method end");
  }

  // public openFile(index) {
  //   this.loggerService.logs.push("openFile method start");
  //   this.currentCdeNodeIndex = index;
  //   console.log("openFile");
  //   try {
  //     this.currentCdeNode = yaml.safeLoad(fs.readFileSync(this.cdeNodes[index].fullpath, 'utf8'));
  //     console.log(this.currentCdeNode);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   this.loggerService.logs.push("openFile method end");
  // }

}
