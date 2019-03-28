import { AlertController } from '@ionic/angular';
import { AuthService } from './../auth/auth.service';
import { Observable, from, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.create((observer) =>{
      observer.next(localStorage.getItem('access_token'));
      observer.complete();
    }).pipe(
      mergeMap((token) =>
        next.handle(this.addToken(req, token)).pipe(catchError(e => {
          this.alertCtrl.create({
            header: e.name,
            message: e.message,
            buttons: ['OK']
          }).then(a => a.present());
          return throwError(e);
        }))
      )
    );
  }

  private addToken(req: HttpRequest<any>, token) {
    let cloned = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.access_token}`,
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'Content-Type': 'application/json'
      }
    });
    return cloned;
  }

  constructor(private readonly authService: AuthService, private readonly alertCtrl: AlertController) { }
}
