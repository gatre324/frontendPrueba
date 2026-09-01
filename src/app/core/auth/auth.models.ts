export interface RegisterRequest { email: string; password: string; first_name: string; last_name: string; }
export interface LoginRequest { email: string; password: string; }
export type UserType = 'patient' | 'nutritionist';
export interface UserResponse { id: string; email: string; first_name: string; last_name: string; user_type: UserType; is_active: boolean; is_verified: boolean; tenant_id: string | null; created_at: string; }
export interface AuthResponse { access_token: string; token_type: string; user: UserResponse; }
export interface RegisterResponse { message: string; user: UserResponse; }
export interface ErrorResponse { code: string; message: string; details?: unknown; }
