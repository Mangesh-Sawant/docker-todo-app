import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  todos: TodoModel[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<TodoModel[]>('https://todo-backend-uped.onrender.com/api/todos')
      .subscribe({
        next: (data: TodoModel[]) => {
          this.todos = data;
          console.log(data);
        },
        error: (err) => {
          console.error("Failed to fetch todos", err);
        }
      });
  }
}

export interface TodoModel {
  id: number;
  task: string;
  completed: boolean;
}
