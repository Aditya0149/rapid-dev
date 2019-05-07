import { Directive, ElementRef, Input, Injector, Renderer2 } from '@angular/core';
import { createCustomElement,  NgElement, WithProperties } from '@angular/elements';
import { NodeComponent } from '../components/node/node.component';
import { NodeService } from '../providers/node.service';
import * as path from 'path';

@Directive({
  selector: '[appNodeHost]'
})
export class NodeHostDirective {
  // @Input("appNodeHostOf") files:an;
  // public nodes:any;
  // constructor(private injector:Injector, private nodeService:NodeService, private elementRef:ElementRef, public renderer:Renderer2) {
  //   this.nodeElement = createCustomElement(NodeComponent, {injector});
  //   customElements.define('app-node',this.nodeElement);
  // }
  // ngOnInit() {
  //   //console.log("hey",this.files);
  // }
  // ngOnChanges(changes) {
  //   if(changes.files.currentValue) {
  //     console.log(changes.files)
  //     let fileData;
  //     this.files.forEach( ( file ) => {
  //       fileData = path.parse(file);
  //       this.nodeService.addNode(fileData,this.renderer);
  //     });
  //   }
  //
  // }
}
