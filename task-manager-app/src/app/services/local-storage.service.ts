import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'tasks';
  private tasksSubject = new BehaviorSubject<any[]>(this.getTasksFromStorage());
  private filterSubject = new BehaviorSubject<string>('Pending');
  tasks$ = this.tasksSubject.asObservable(); //observable
  filteredTasks$ = new BehaviorSubject<any[]>([]); //observable

  //Check if local storage is available
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

   //Parse existing tasks to JSON
  private getTasksFromStorage(): any[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
    return [];
  }

 //Stringify and save tasks to storage
  private saveTasksToStorage(tasks: any[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

   //Get tasks
  getTasks(): any[] {
    return this.tasksSubject.getValue();
  }

  //On adding new task that has no id, generate id based on timestamp, add new task to task list, 
  // then save to storage and "refresh" list
  addTask(task: any): void {
    if (!task.id) {
      task.id = new Date().getTime(); 
    }
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasksToStorage(tasks);
    alert('Task added successfully!');
    this.tasksSubject.next(tasks);
    this.applyFilter(this.filterSubject.getValue());
  }

  //Get task and update it using id, then save to storage and "refresh" list
  updateTask(updatedTask: any): void {
    const tasks = this.getTasks().map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasksToStorage(tasks);
    this.tasksSubject.next(tasks);
    this.applyFilter(this.filterSubject.getValue());
  }

  //Find task with id and delete it, update storage and list 
  deleteTask(taskId: number): void {
    const tasks = this.getTasks().filter((task) => task.id !== taskId);
    this.saveTasksToStorage(tasks);
    alert('Task deleted successfully!');
    this.tasksSubject.next(tasks);
    this.applyFilter(this.filterSubject.getValue());
  }

  //Set filter on tasks
  setFilter(filter: string): void {
    this.filterSubject.next(filter);
    this.applyFilter(filter);
  }

  private applyFilter(filter: string): void {
    const tasks = this.getTasks();
    let filteredTasks;
    switch (filter) {
      case 'Pending':
        filteredTasks = tasks.filter((task) => !task.completed);
        break;
      case 'Completed':
        filteredTasks = tasks.filter((task) => task.completed);
        break;
      case 'Work':
        filteredTasks = tasks.filter((task) => task.category === 'Work');
        break;
      case 'Personal':
        filteredTasks = tasks.filter((task) => task.category === 'Personal');
        break;
      default:
        filteredTasks = tasks;
    }
    this.filteredTasks$.next(filteredTasks);
  }
}
