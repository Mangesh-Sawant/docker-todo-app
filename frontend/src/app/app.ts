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

  todos: any[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    // Fetch data from our Node.js Backend container!
    this.http.get<any[]>('https://todo-backend-uped.onrender.com/api/todos')
      .subscribe({
        next: (data) => {
          this.todos = data;
          console.log(data);
        },
        error: (err) => {
          console.error("Failed to fetch todos", err);
        }
      });
  }
}
