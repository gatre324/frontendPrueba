import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import { AuthResponse, LoginRequest, RegisterRequest, RegisterResponse, UserResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  register(request: RegisterRequest): Observable<RegisterResponse> { return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, request); }
  login(request: LoginRequest): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request); }
  logout(): Observable<void> { return this.http.post<void>(`${this.baseUrl}/logout`, {}); }
  me(): Observable<UserResponse> { return this.http.get<UserResponse>(`${this.baseUrl}/me`); }
}
