import { Component, OnInit } from '@angular/core';
import {SuiModal, ComponentModalConfig, ModalSize} from "ng2-semantic-ui"

interface IConfirmModalContext {
  title:string;
  question:string;
}


@Component({
  selector: 'modal-confirm',
  template: `
  <div class="header">{{ modal.context.title }}</div>
  <div class="content">
      <p>{{ modal.context.question }}</p>
  </div>
  <div class="actions">
      <button class="ui red button" (click)="modal.deny(undefined)">Cancel</button>
      <button class="ui green button" (click)="modal.approve(undefined)" autofocus>OK</button>
  </div>
  `
})
export class ConfirmModalComponent implements OnInit {

  constructor( public modal:SuiModal<IConfirmModalContext, void, void>) { }

  ngOnInit() {
  }
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
  constructor(title:string, question:string, size = ModalSize.Small) {
      super( ConfirmModalComponent, { title, question });

      this.isClosable = false;
      this.transitionDuration = 200;
      this.size = size;
  }
}

