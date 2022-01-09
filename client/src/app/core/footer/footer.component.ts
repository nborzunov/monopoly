import { Component } from '@angular/core'
import { currentLang, lang } from 'app/constants/lang.constants'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  lang = lang[currentLang]
}
