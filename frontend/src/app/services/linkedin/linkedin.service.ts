import { Post } from '../../common/interfaces/post';
import { Injectable } from '@angular/core';
import { POSTS } from './mock-data';

export function getterFactory() {
  return {
    source: POSTS
  };
}
@Injectable({
  providedIn: 'root'
})
export class LinkedinService {
  constructor() {}
  /**
   * read factory post
   */
  getPosts(): Post[] {
    return getterFactory().source;
  }
}
