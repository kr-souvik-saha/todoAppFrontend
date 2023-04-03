import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private addTodoURL: string;
  private httpOptions = {};

  constructor(private http: HttpClient) {
    this.addTodoURL = 'http://localhost:5000/api/todo';

    // Set the HTTP headers with the JWT token
    const token = localStorage.getItem('token');
    if (token) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
      };
    }
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.addTodoURL, todo, this.httpOptions);
  }

  getAllTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.addTodoURL, this.httpOptions);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${this.addTodoURL}/${todo._id}`,
      todo,
      this.httpOptions
    );
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.addTodoURL}/${id}`, this.httpOptions);
  }
}
