import { Injectable } from "@angular/core";

export type UserRole = 'ADMIN' | 'PROCUREMENT' | 'PRODUCTION';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = {
    role: 'ADMIN' as UserRole,
  };

  getRole(): UserRole {
    return this.user.role;
  }
}
