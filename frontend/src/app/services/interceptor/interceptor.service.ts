import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './../auth/auth.service';
import { Observable, from, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly alertCtrl: AlertController,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authService.access_token).pipe(
      mergeMap(token =>
        next.handle(this.addToken(req, token)).pipe(
          catchError(e => {
            if (e.status === 403) {
              this.router.navigate(['/unauthorized']);
            } else {
              this.alertCtrl
                .create({
                  header: e.name,
                  message: e.message,
                  buttons: ['OK']
                })
                .then(a => a.present());
            }
            return throwError(e);
          })
        )
      )
    );
  }

  private addToken(req: HttpRequest<any>, token) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'Content-Type': 'application/json'
      }
    });
  }
}
