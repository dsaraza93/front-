import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`; // Ejemplo: http://localhost:5017/api/tasks

  constructor(private http: HttpClient) {}

  // Obtener la lista de tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Crear una nueva tarea
  addTask(title: string, description: string): Observable<Task> {
    const newTask: Task = {
      id: 0, // El backend asignará el ID
      title,
      description,
      completed: false,
      createdDate: new Date()
    };
    return this.http.post<Task>(this.apiUrl, newTask);
  }

  // Actualizar el estado de una tarea (PATCH)
  toggleTaskCompletion(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${task.id}/status`, !task.completed);
  }

  // Actualizar una tarea completa (PUT) con 5 argumentos
  updateTask(taskId: number, newTitle: string, newDescription: string, completed: boolean, createdDate: Date): Observable<Task> {
    const updatedTask: Task = {
      id: taskId,
      title: newTitle,
      description: newDescription,
      completed,
      createdDate
    };
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, updatedTask);
  }

  // Eliminar una tarea
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
