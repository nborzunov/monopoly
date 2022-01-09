import { Component } from '@angular/core'
import { currentLang, lang } from 'app/constants/lang.constants'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  lang = lang[currentLang]
}
