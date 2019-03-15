import { Injectable } from '@angular/core';
import { LinkedInService } from 'angular-linkedin-sdk';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {
  public isUserAuthenticated;
  public constructor(private _linkedInService: LinkedInService) {}
}
