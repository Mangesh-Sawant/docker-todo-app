import { HttpClient } from '@angular/common/http';
import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TodoModel {
  _id: string;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // 1. MODERN: Use inject() instead of a constructor!
  private http = inject(HttpClient);

  // 2. MODERN: All state is managed by Signals
  todos = signal<TodoModel[]>([]);
  newTask = signal<string>('');

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.http.get<TodoModel[]>('http://localhost:3000/api/todos')
      .subscribe(data => this.todos.set(data));
  }

  addTodo() {
    // Read the signal using ()
    if (!this.newTask().trim()) return;

    this.http.post('http://localhost:3000/api/todos', { task: this.newTask() })
      .subscribe(() => {
        this.newTask.set(''); // Clear the input box
        this.fetchTodos();
      });
  }

  deleteTodo(id: string) {
    this.http.delete(`http://localhost:3000/api/todos/${id}`)
      .subscribe(() => {
        this.fetchTodos();
      });
  }
}
