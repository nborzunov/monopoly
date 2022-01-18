import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:7000'

  constructor(private http: HttpClient) {}

  getGoogleSigninUrl() {
    return this.http.get(`/api/google`)
  }

  checkValidation() {
    return this.http.get('/api/auth')
  }
}
