import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatsService {
  constructor() { }

  formatDate(date: Date): string {
    const option = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Asia/Shanghai',
    };
    return new Intl.DateTimeFormat('zh-Hans-CN', option).format(date);
  }
}