import { Injectable } from "@angular/core";

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // intercept method is called automatically for every HTTP request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get the token from local storage
    const token = localStorage.getItem('accessToken');

    // If token exists, clone the request and add the Authorization header
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`) // Add Bearer token to header
      });

      // Pass the cloned request with the header to the next handler
      return next.handle(cloned);
    }

    // If no token, pass the original request without modifying it
    return next.handle(req);
  }
}
// i jsut have to understand nfew things about method interceptr