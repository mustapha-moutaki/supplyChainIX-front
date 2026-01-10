import { Injectable, inject } from "@angular/core";
import { AuthApi } from "../../api/auth.api";
import { LoginRequest } from "../models/auth.model";
@Injectable({ providedIn : 'root'})

export class AuthService{
  
  private loginUrl = inject(AuthApi);
  login(data:LoginRequest){
    return this.loginUrl.login(data); 
  }
  
}