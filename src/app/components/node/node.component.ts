import { Component, Input, ComponentFactoryResolver, ViewContainerRef, ElementRef } from '@angular/core';
import { NodeHostDirective } from '../../directives/node-host.directive';
import { NodeService } from '../../providers/node.service';
import { NodeData } from "../../types/node-data";
import { LoggerService } from '../../providers/logger.service';

import * as yaml from 'js-yaml';
import * as fs from 'fs';
@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  @Input() nodeData:any;
  private isOpen = false;
  constructor(private cfr:ComponentFactoryResolver, private nodeService:NodeService, private elemRef:ElementRef, private loggerService:LoggerService) { }

  public onNodeClick(){
    this.loggerService.logs.push("current accessor = ",this.nodeData.accessor);
    let previousNode = this.nodeService.previousNode;
    this.nodeService.currentEle = this.elemRef.nativeElement;
    if ( previousNode && previousNode.nodeData.dataType == "string" && previousNode.nodeData.data != this.nodeService.nodeCopy ) {
      previousNode.querySelector(".node").classList.remove("saved");
      previousNode.querySelector(".node").className += " unsaved";
      this.nodeService.unsavedNodes.push(previousNode);
    }
    this.nodeService.previousNode = this.elemRef.nativeElement;
    if(this.nodeData.dataType !== "string" && this.isOpen) {
      this.nodeService.removeNodes(this.elemRef.nativeElement);
      this.nodeService.nodeCopy = "";
      this.isOpen = false;
      this.loggerService.logs.push("child nodes removed");
      return;
    }
    this.isOpen = true;
    this.loggerService.logs.push("case : "+this.nodeData.dataType);

    switch(this.nodeData.dataType) {
      case "url":
        this.nodeService.setYamlData(this.nodeData.data);
        this.addObjectAsNodeData(this.nodeService.yamlObject);
        break;
      case "string":
        this.nodeService.nodeCopy = this.nodeData.data;
        break;
      case "object":
        this.addObjectAsNodeData(this.nodeData.data);
        break;
    }
  }
  private addObjectAsNodeData(obj) {
    this.nodeService.nodeCopy = "";
    Object.keys(obj).forEach( (key) => {
        let accessor = this.nodeData.accessor + "." + key;
        this.nodeService.addNode(new NodeData(key,typeof(obj[key]),obj[key],accessor,this.nodeData.filePath),this.elemRef.nativeElement);
    });
  }
}
