import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export abstract class HttpService {
  private host: string;

  constructor(protected httpClient: HttpClient) {
    this.host = 'https://malow.duckdns.org:8754';
  }

  protected post(uri: string, body: any): Observable<any> {
    return this.httpClient.post(this.host + uri, body, this.createHttpOptions());
  }

  protected get<T>(uri: string, params: object = {}): Observable<T> {
    for (let param of Object.keys(params)) {
      uri = uri.replace(':' + param, params[param]);
    }
    return this.httpClient.get<T>(this.host + uri, this.createHttpOptions());
  }

  private createHttpOptions(): { headers: HttpHeaders } {
    let headers = { 'Content-Type':  'application/json' };
    if (localStorage.getItem('sessionKey')) {
      headers['Session-Key'] = localStorage.getItem('sessionKey');
    }
    return { headers: new HttpHeaders(headers) };
  }
}
