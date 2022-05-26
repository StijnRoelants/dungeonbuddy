import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRace} from '../../classes/race';
import { map } from 'rxjs/operators';
import {IClass} from '../../classes/classes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseURL = 'https://www.dnd5eapi.co/api';

  constructor(private http: HttpClient) { }

  getRace(selectedRace: string): Observable<IRace> {
    console.log(`${this.baseURL}/races/${selectedRace}`);
    return this.http
      .get<IRace>(
        `${this.baseURL}/races/${selectedRace}`,
        {
          observe: 'body',
          responseType: 'json'
        }
      )
      .pipe(
        map<IRace, IRace>(x => x)
      );
  }

  getClass(selectedClass: string): Observable<IClass> {
    console.log(`${this.baseURL}/classes/${selectedClass}`);
    return this.http
      .get<IClass>(
        `${this.baseURL}/classes/${selectedClass}`,
        {
          observe: 'body',
          responseType: 'json'
        }
      )
      .pipe(
        map<IClass, IClass>(x => x)
      );
  }

}
