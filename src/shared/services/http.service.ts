import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export abstract class HttpService {
  private host: string;

  constructor(protected httpClient: HttpClient) {
    this.host = 'https://malow.duckdns.org:8754';
  }

  protected post(uri: string, body: any): Observable<any> {
    return this.httpClient.post(this.host + uri, body);
  }

  protected get<T>(uri: string): Observable<T> {
    return this.httpClient.get<T>(this.host + uri);
  }
}
