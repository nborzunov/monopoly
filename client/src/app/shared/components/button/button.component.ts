import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() variant?: 'transparent' | 'outline' | 'filled' = 'filled'
  @Input() backgroundColor?: 'primary' | 'secondary' | 'none' = 'none'
  @Input() title: string = ''
  @Input() class: string = ''
    
  constructor() { }

  ngOnInit(): void {
  }



}
