import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request Interceptor: ', req);

    if (req.method === 'POST') {
      const newRequest = req.clone({ headers: new HttpHeaders({ 'token': '12345' }) });
      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}