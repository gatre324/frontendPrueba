import { computed, Injectable, signal } from '@angular/core';
import { AuthResponse, UserResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly tokenKey = 'si2_access_token';
  private readonly userKey = 'si2_user';
  private readonly tokenSignal = signal<string | null>(sessionStorage.getItem(this.tokenKey));
  private readonly userSignal = signal<UserResponse | null>(this.readUser());
  readonly token = this.tokenSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.tokenSignal()));

  setSession(session: AuthResponse): void { sessionStorage.setItem(this.tokenKey, session.access_token); sessionStorage.setItem(this.userKey, JSON.stringify(session.user)); this.tokenSignal.set(session.access_token); this.userSignal.set(session.user); }
  clearSession(): void { sessionStorage.removeItem(this.tokenKey); sessionStorage.removeItem(this.userKey); this.tokenSignal.set(null); this.userSignal.set(null); }
  private readUser(): UserResponse | null { const value = sessionStorage.getItem(this.userKey); if (!value) return null; try { return JSON.parse(value) as UserResponse; } catch { sessionStorage.removeItem(this.userKey); return null; } }
}
