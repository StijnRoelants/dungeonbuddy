import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRace} from '../../classes/race';
import { map } from 'rxjs/operators';

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

}
