import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  constructor() { }
  login(email: string, password: string) {
    return this.http.post<{ token: string; id: string }>(
      `${environment.apiUrl}Authorization`, // Ensure the URL is correct
      { email, password }
    );
  }
  logout() {
    localStorage.removeItem('token'); // Or sessionStorage if you use that
  }
get isLoggedIn()
{
  if(localStorage.getItem("token"))
  {
    return true;
  }
  else
  {
    return false;
  }
}
}
