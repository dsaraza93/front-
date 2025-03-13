// src/app/pipes/task-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[] | null, filter: string, searchTerm: string): Task[] {
    if (!tasks) return [];
    let filtered = tasks;

    // Filtrado por estado
    if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'today') {
      const today = new Date();
      filtered = filtered.filter(task => {
        const taskDate = new Date(task.createdDate);
        return taskDate.getDate() === today.getDate() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getFullYear() === today.getFullYear();
      });
    }

    // Filtrado por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }
}
