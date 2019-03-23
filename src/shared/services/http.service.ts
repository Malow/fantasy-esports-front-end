import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export abstract class HttpService {
  private host: string;

  constructor(protected httpClient: HttpClient) {
    this.host = 'https://malow.duckdns.org:8754';
  }

  protected post(uri: string, body: any, params: object = {}): Observable<any> {
    for (let param of Object.keys(params)) {
      uri = uri.replace(':' + param, params[param]);
    }
    return this.httpClient.post(this.host + uri, body, this.createHttpOptions());
  }

  protected get<T>(uri: string, params: {uriParams: object, queryParams: object} = {uriParams: {}, queryParams: {}}): Observable<T> {
    let queryParams = [];
    for (let param of Object.keys(params.uriParams)) {
      uri = uri.replace(':' + param, params.uriParams[param]);
    }
    for (let param of Object.keys(params.queryParams)) {
      queryParams.push(`${param}=${params.queryParams[param]}`)
    }
    if(queryParams.length > 0) {
      uri += '?' + queryParams.join('&');
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

  protected patch(uri: string, body: any, params: object = {}): Observable<any> {
    for (let param of Object.keys(params)) {
      uri = uri.replace(':' + param, params[param]);
    }
    return this.httpClient.patch(this.host + uri, body, this.createHttpOptions());
  }
}
