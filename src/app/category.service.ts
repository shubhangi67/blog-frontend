import { inject, Injectable } from '@angular/core';
import { Category } from './types/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
http = inject(HttpClient)
  constructor() { }
  getAllCategory()
    {
      return this.http.get<Category[]>(environment.apiUrl+ "Category");
    }
}
