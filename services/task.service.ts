import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private filteredTasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getFilteredTasks(): Observable<Task[]> {
    return this.filteredTasksSubject.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    this.filteredTasksSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
      this.filteredTasksSubject.next(this.tasks);
    }
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
    this.filteredTasksSubject.next(this.tasks);
  }

  filterTasks(category: string, tags: string[], priority: string): Task[] {
    return this.tasks.filter(task =>
      (!category || task.category === category) &&
      (!tags.length || tags.every(tag => task.tags.includes(tag))) &&
      (!priority || task.priority === priority)
    );
  }

  updateFilteredTasks(filteredTasks: Task[]) {
    this.filteredTasksSubject.next(filteredTasks);
  }
}