import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  getAllSiblings(element: HTMLElement, parent: any) {
    const children = [...parent.children];
    return children.filter((child) => child !== element);
  }
}
