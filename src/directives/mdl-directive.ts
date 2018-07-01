import {Directive, Input, OnInit} from '@angular/core';
declare var componentHandler: any;

@Directive({
  selector: '[mdl]',
})
export class MdlDirective implements OnInit {
  @Input() private mdl;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      componentHandler.upgradeDom();
    });
  }
}
