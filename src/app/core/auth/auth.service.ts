import { Injectable, inject } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { AuthApi } from './auth.api';
import { AuthResponse, LoginRequest, RegisterRequest, RegisterResponse } from './auth.models';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApi);
  private readonly store = inject(AuthStore);
  readonly session = this.store.user;
  readonly isAuthenticated = this.store.isAuthenticated;
  register(request: RegisterRequest): Observable<RegisterResponse> { return this.api.register(request); }
  login(request: LoginRequest): Observable<AuthResponse> { return this.api.login(request).pipe(tap((session) => this.store.setSession(session))); }
  logout(): Observable<void> { return this.api.logout().pipe(finalize(() => this.store.clearSession())); }
  clearSession(): void { this.store.clearSession(); }
}
