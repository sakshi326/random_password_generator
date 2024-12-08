import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {}

  scheduleNotification(task: Task) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const now = new Date().getTime();
      const notificationTime = new Date(task.deadline).getTime() - 30 * 60 * 1000; // 30 minutes before deadline
      
      if (notificationTime > now) {
        setTimeout(() => {
          new Notification('Task Reminder', {
            body: `Your task "${task.title}" is due in 30 minutes!`,
            icon: 'assets/icon.png'
          });
        }, notificationTime - now);
      }
    }
  }

  requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
}