import { Component, Input } from '@angular/core'

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant?: 'transparent' | 'outline' | 'filled' = 'filled'
  @Input() backgroundColor?: 'primary' | 'secondary' | 'none' = 'none'
  @Input() size?: 'sm' | 'md' | 'lg' = 'md'
  @Input() title: string = ''
  @Input() class: string = ''

  constructor() {}
}
