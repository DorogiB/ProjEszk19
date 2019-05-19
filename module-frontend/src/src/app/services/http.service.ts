
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * This service is responsible for communication with the backend via REST API.
 *
 * @export
 * @class HttpService
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private get options() {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (window.localStorage.getItem('token')) {
      headers['Authorization'] = `Basic ${window.localStorage.getItem('token')}`;
    }

    return {
      headers: new HttpHeaders(headers)
    };
  }

  /**
   * URL of the backend server.
   *
   * @private
   * @memberof HttpService
   */
  private URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  /**
   * Sends a GET request to the backend and returns its answer.
   *
   * @template T
   * @param {string} route Backend endpoint where the request is sent.
   * @returns {Promise<T>} The answer of the backend. (Type T JSON object.)
   * @memberof HttpService
   */
  public get<T>(route: string): Promise<T> {
    return this.httpClient.get(this.URL + route, this.options)
    .toPromise() as Promise<T>;
  }

  /**
   * Sends a POST request to the backend and returns its answer.
   *
   * @template T
   * @param {string} route Backend endpoint where the request is sent.
   * @param {string} body The body of the HTTP request. (Stringified JSON.)
   * @returns {Promise<T>} The answer of the backend. (Type T JSON object.)
   * @memberof HttpService
   */
  public post<T>(route: string, body: string): Promise<T> {
    return this.httpClient.post(this.URL + route, body, this.options)
      .toPromise() as Promise<T>;
  }

  /**
   * Sends a PUT request to the backend and returns its answer.
   *
   * @template T
   * @param {string} route Backend endpoint where the request is sent.
   * @param {string} body The body of the HTTP request. (Stringified JSON.)
   * @returns {Promise<T>} The answer of the backend. (Type T JSON object.)
   * @memberof HttpService
   */
  public put<T>(route: string, body: string): Promise<T> {
    return this.httpClient.put(this.URL + route, body, this.options)
      .toPromise() as Promise<T>;
  }

  /**
   * Sends a PATCH request to the backend and returns its answer.
   *
   * @template T
   * @param {string} route Backend endpoint where the request is sent.
   * @param {string} body The body of the HTTP request. (Stringified JSON.)
   * @returns {Promise<T>} The answer of the backend. (Type T JSON object.)
   * @memberof HttpService
   */
  public patch<T>(route: string, body: string): Promise<T> {
    return this.httpClient.patch(this.URL + route, body, this.options)
      .toPromise() as Promise<T>;
  }

  /**
   * Sends a DELETE request to the backend and returns its answer.
   *
   * @template T
   * @param {string} route Backend endpoint where the request is sent.
   * @returns {Promise<T>} The answer of the backend. (Type T JSON object.)
   * @memberof HttpService
   */
  public delete<T>(route: string): Promise<T> {
    return this.httpClient.delete(this.URL + route, this.options)
      .toPromise() as Promise<T>;
  }
}
