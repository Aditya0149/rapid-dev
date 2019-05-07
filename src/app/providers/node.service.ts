import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import {NodeComponent} from "../components/node/node.component";
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private readonly nodesWrapper:string = "node_list";
  private readonly subnodesWrapper:string = "subnodes";
  public nodeCopy:string = "";
  public filePath:string = "";
  public yamlObject:any = {};
  public currentEle:any = {};
  public previousNode:NodeComponent;
  public unsavedNodes:any = [];
  constructor() { }
  public addNode(nodedata, parentNode){
    if (!nodedata) {
      alert("File is empty");
      return;
    }
    let htmlEle: NgElement & WithProperties<NodeComponent> = document.createElement('app-node') as any;
    let wrapper = document.getElementById(this.nodesWrapper);
    if(parentNode) wrapper = parentNode.querySelector("." + this.subnodesWrapper);
    htmlEle.nodeData = nodedata;
    wrapper.appendChild(htmlEle);
  }
  public removeNodes(elem) {
    let childrens = elem.querySelectorAll("app-node");
    let flag = true;
    let save = false;
    for ( let child of childrens ) {
      if ( this.unsavedNodes.includes(child) ) {
        if (flag) {
          save = confirm("Do you want to save your unsaved work ?");
          if ( !save ) break;
          flag = false;
        }
        let exp = "this.yamlObject" + child.nodeData.accessor + "= child.nodeData.data";
        eval(exp);
      }
    }
    fs.writeFileSync(this.currentEle.nodeData.filePath,yaml.safeDump(this.yamlObject));
    elem.querySelector("." + this.subnodesWrapper).innerHTML = "";
  }
  public saveNode(){
    let exp = "this.yamlObject" + this.currentEle.nodeData.accessor + "= this.currentEle.nodeData.data";
    eval(exp);
    fs.writeFileSync(this.currentEle.nodeData.filePath,yaml.safeDump(this.yamlObject));
    this.currentEle.querySelector(".node").classList.remove("unsaved");
    this.currentEle.querySelector(".node").className += " saved";
    console.log("saved object " + yaml.safeDump(this.yamlObject));
    console.log("saved at " + this.currentEle.nodeData.filePath);
  }
  public setYamlData(data) {
    this.filePath = data;
    this.yamlObject = yaml.safeLoad(fs.readFileSync(data, 'utf8'));
  }
  public saveAllUnsavedNodes() {
    for ( let node of this.unsavedNodes ) {
      let exp = "this.yamlObject" + node.nodeData.accessor + "= node.nodeData.data";
      eval(exp);
    }
  }
}
