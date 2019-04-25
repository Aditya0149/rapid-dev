import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNodeHost]'
})
export class NodeHostDirective {

  constructor(public vcr: ViewContainerRef) { }

}
