import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-modal-error',
  template: require('./modal-error.component.html'),
  styles: [require('./modal-error.component.scss')],
})
export class ModalErrorComponent implements OnInit {

  constructor() {
  }

  @Output()
  close = new EventEmitter<void>();

  @Output()
  cancel = new EventEmitter<void>();

  @Input()
  title: string;

  @Input()
  message: string;

  @Input()
  icon: string;

  ngOnInit(): void {
  }

}
