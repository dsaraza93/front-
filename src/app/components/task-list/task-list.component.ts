import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  // Variables para agregar tarea
  newTitle: string = '';
  newDescription: string = '';
  showAddModal: boolean = false;

  // Variables para editar tarea
  showEditModal: boolean = false;
  editingTask: Task | null = null;
  editTitle: string = '';
  editDescription: string = '';

  // Variables para filtros y búsqueda
  filter: string = 'all';
  searchTerm: string = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit(): void {}

  // Métodos para agregar tarea
  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.newTitle = '';
    this.newDescription = '';
  }

  addTask(form: NgForm): void {
    if (form.valid && this.newTitle.trim()) {
      this.taskService.addTask(this.newTitle, this.newDescription).subscribe(() => {
        this.tasks$ = this.taskService.getTasks();
        form.resetForm();
        this.closeAddModal();
      });
    }
  }

  // Método para alternar el estado de completado
  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task).subscribe(() => {
      this.tasks$ = this.taskService.getTasks();
    });
  }

  // Método para eliminar tarea
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks$ = this.taskService.getTasks();
    });
  }

  // Método trackBy para optimizar *ngFor
  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  // Métodos para editar tarea
  openEditModal(task: Task): void {
    this.editingTask = task;
    this.editTitle = task.title;
    this.editDescription = task.description || '';
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingTask = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  submitEditTask(form: NgForm): void {
    if (form.valid && this.editingTask) {
      this.taskService.updateTask(
        this.editingTask.id,
        this.editTitle,
        this.editDescription,
        this.editingTask.completed,
        this.editingTask.createdDate
      ).subscribe(() => {
        this.tasks$ = this.taskService.getTasks();
        form.resetForm();
        this.closeEditModal();
      });
    }
  }
}
