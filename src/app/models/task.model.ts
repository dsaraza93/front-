// src/app/models/task.model.ts

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdDate: Date;  // Nueva propiedad para almacenar la fecha de creación
}
