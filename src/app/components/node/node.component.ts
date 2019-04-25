import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NodeHostDirective } from '../../directives/node-host.directive';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  //@Input() cdeNode:any;
  cdeNode = {
    name : 'hey'
  }
  constructor(private cfr:ComponentFactoryResolver, private nodeHostDirective: NodeHostDirective) { }

  ngOnInit() {
  }
  public openNode(){
    let cf = this.cfr.resolveComponentFactory(NodeComponent);
    let vcr = this.nodeHostDirective.vcr;
    vcr.createComponent(cf);
  }
}
