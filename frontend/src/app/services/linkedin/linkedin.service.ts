import { PostsMock } from '../../common/interfaces/posts-mock';
import { Injectable } from '@angular/core';
import { POSTS } from './mock-data';
@Injectable({
  providedIn: 'root'
})
export class LinkedinService {
  constructor() {}
  getHospitalsMock(): PostsMock[] {
    return POSTS;
  }
}
