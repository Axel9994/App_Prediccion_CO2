import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Data} from '../modelos/data';

const SERVER_URL: string = 'api/';

@Injectable()
export class AppServiceService {

  constructor(private http: HttpClient) { }

  public postData(data: Data) {
    return this.http.post(`${SERVER_URL}predict`, data, this.generateHeaders());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
