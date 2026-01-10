import { Injectable, inject } from "@angular/core";
import { AuthApi } from "../../api/auth.api";
import { LoginRequest } from "../models/auth.model";
import { tap } from "rxjs/operators";


@Injectable({ providedIn : 'root'})

export class AuthService{
  
  private loginUrl = inject(AuthApi);
  login(data:LoginRequest){
    return this.loginUrl.login(data)
     .pipe(
      tap(res => {
        // save tokens and role in localStorage
        localStorage.setItem('accessToken', res.accessToken);

        // save refresh token in localStorage
        localStorage.setItem('refreshToken', res.refreshToken);

        // save role in localStorage
        localStorage.setItem('role', res.role);
      })
    )
  }
  
}