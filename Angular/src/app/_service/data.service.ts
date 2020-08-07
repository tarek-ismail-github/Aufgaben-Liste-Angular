import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../_interface/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverUrl = 'http://localhost:3000';
  public $todos: Observable<ToDo[]>;
  public $todosdone: Observable<ToDo[]>;

  constructor(
    private _http: HttpClient
    ) {
      this.getGlobalData();
    }

  public getGlobalData(): void {
    this.$todos = this.getToDo();
    this.$todosdone = this.getToDoDone();
  }

  // POST
  public postToDo(object: ToDo): Observable<ToDo> {
      const httpOptions = {
          headers: new HttpHeaders ({
              'Content-Type': 'application/json'
          })
      };
      return this._http.post<ToDo>(`${this.serverUrl}/todos`, object, httpOptions);
  }

  // GET
  public getToDo(): Observable<ToDo[]> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      return this._http.get<ToDo[]>(`${this.serverUrl}/todos`, httpOptions);
  }

  public getToDoDone(): Observable<ToDo[]> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      return this._http.get<ToDo[]>(`${this.serverUrl}/todo?status=true`, httpOptions);
  }

  // DELETE
  public deleteToDo(object: ToDo): Observable<ToDo> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      return this._http.delete<ToDo>(`${this.serverUrl}/todos/${object.id}`, httpOptions);
  }

  // PUT
  public putToDo(object: ToDo): Observable<ToDo> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      return this._http.put<ToDo>(`${this.serverUrl}/todos/${object.id}`, object, httpOptions);
  }

}
