import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $isAuthenticated = new BehaviorSubject(false)
  $user = new BehaviorSubject(null)

  constructor(private apiService: ApiService) {
    this.apiService.checkValidation().subscribe((data: any) => {
      this.$user.next(data)
      this.$isAuthenticated.next(true)
    })
  }

  get user() {
    return this.$user.getValue()
  }

  get isAuthenticated() {
    return this.$isAuthenticated.getValue()
  }
}
