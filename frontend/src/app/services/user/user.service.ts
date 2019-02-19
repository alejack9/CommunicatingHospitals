import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of as observableOf } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  people: any = [];

  constructor(private http: HttpClient) {}

  getPeopleList() {
    if (this.people.length) {
      return observableOf(this.people);
    } else {
      return this.http
        .get('https://randomuser.me/api/?results=20&?seed=foobar')
        .pipe(
          map((data: any) => data.results),
          tap(people => (this.people = people))
        );
    }
  }

  getPerson(index) {
    if (!this.people[index]) {
      return this.getPeopleList().pipe(map(people => this.people[index]));
    } else {
      return observableOf(this.people[index]);
    }
  }
}
